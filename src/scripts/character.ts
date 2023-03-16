import { Axios } from 'axios';
import md5 from 'md5';
import envFile from 'dotenv';
import { AppDataSource } from '../database/data-source.js';
import { CharacterDataWrapper } from '../types/marvel/character/CharacterDataWrapper.js';
import Character from '../entities/character.js';
import SeriesSummary from '../entities/seriesSummary.js';
import { convert } from 'html-to-text';
envFile.config();

(async () => {
  const database = await AppDataSource.initialize();
  const migratiosList = await database.runMigrations({ transaction: 'all' });

  if (migratiosList.length > 0) console.log('ALL MIGRATIONS WERE EXECUTED');

  console.log('Database connections established');

  const marvelApi = new Axios({
    baseURL: 'http://gateway.marvel.com',
  });

  const PRIVATE_KEY_MARVEL = process.env.PRIVATE_KEY_MARVEL;
  const PUBLIC_KEY_MARVEL = process.env.PUBLIC_KEY_MARVEL;
  const timestamp = Number(new Date());

  const md5Hash: string = md5(
    String(timestamp) + PRIVATE_KEY_MARVEL + PUBLIC_KEY_MARVEL,
  );

  const urlRequest = `/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY_MARVEL}&hash=${md5Hash}`;

  const { data: json } = await marvelApi.get(
    `${urlRequest}&limit=1&offset=0`,
    {},
  );

  const resultRequestCharacter: CharacterDataWrapper = JSON.parse(
    json as string,
  );

  if (resultRequestCharacter.code !== 200) {
    throw new Error(resultRequestCharacter.status);
  }

  const totalHeroes: number = resultRequestCharacter?.data?.total ?? 0;

  for (let index = 0; index < Math.ceil(totalHeroes / 100); index++) {
    const offset = index === 0 ? index * 100 : index * 100 + 1;

    const { data: json } = await marvelApi.get(
      `${urlRequest}&limit=100&offset=${offset}`,
      {},
    );
    const { data }: CharacterDataWrapper = JSON.parse(json);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!data) {
      throw new Error('Data not found');
    }

    if (data.results === undefined || data.results === null) {
      throw new Error('Results not found');
    }

    const defaultThumbnail =
      'https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img';

    for (const character of data.results) {
      // eslint-disable-next-line no-constant-condition, @typescript-eslint/strict-boolean-expressions
      await database
        .createQueryBuilder()
        .insert()
        .into(Character)
        .values([
          {
            id_origin: character.id,
            name: character.name,
            description:
              character.description !== ''
                ? convert(character.description)
                : null,
            modified: !character.modified.toString().includes('NaN')
              ? character.modified
              : undefined,
            imageURL: `${character?.thumbnail?.path ?? defaultThumbnail}.${
              character?.thumbnail?.extension ?? 'jpg'
            }`,
            resourceURI: character.resourceURI,
          },
        ])
        .printSql()
        .execute();
      console.log(`\n${character.name} inserted`);

      if (character.series === undefined || character.series === null) continue;

      await database
        .createQueryBuilder()
        .insert()
        .into(SeriesSummary)
        .values(
          character.series.items.map((item) => {
            return {
              id_origin: character.id,
              name: item.name,
              resourceURI: item.resourceURI,
            };
          }),
        )
        .printSql()
        .execute();
      console.log(`\n${character.name} series inserted`);
    }
  }
})()
  .then(() => {
    console.log('Characters insert with success');
  })
  .catch((error: Error) => {
    console.log(error?.message);
    console.log('Error to insert characters');
  });
