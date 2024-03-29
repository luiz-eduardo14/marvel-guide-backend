import md5 from 'md5';
import envFile from 'dotenv';
import { GenericDataWrapper } from '../types/marvel/GenericDataWrapper';
import Character from '../entities/character';
import { RequestMarvel } from '../entities/requestMarvel';
import { getCurrentDatabaseRequestMarvel, updateRequestMarvel } from '../utils/requestMarvelUtil';
import { SummarySeries } from '../entities/summarySeries';
import { convert } from 'html-to-text';
import { DataSource } from 'typeorm';
import { marvelApi } from '../utils/api/marvel';
import { GenericDataContainer } from '../types/marvel/GenericDataContainer';
import { Hero } from '../types/marvel/character/Hero';
envFile.config();

export const PopulateCharactersScript = async (database: DataSource) => {
  const PRIVATE_KEY_MARVEL = process.env.PRIVATE_KEY_MARVEL;
  const PUBLIC_KEY_MARVEL = process.env.PUBLIC_KEY_MARVEL;
  const timestamp = Number(new Date());

  const md5Hash: string = md5(
    String(timestamp) + PRIVATE_KEY_MARVEL + PUBLIC_KEY_MARVEL,
  );

  const urlRequest = `/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY_MARVEL}&hash=${md5Hash}`;

  let currentRequestMarvel = await getCurrentDatabaseRequestMarvel(database);

  const repositoryRequestMarvel = database.getRepository(RequestMarvel);

  const { data: json } = await marvelApi.get(
    `${urlRequest}&limit=1&offset=0`,
    {},
  );

  currentRequestMarvel = await updateRequestMarvel({
    repository: repositoryRequestMarvel,
    requestMarvel: currentRequestMarvel,
  });

  const resultRequestCharacter: GenericDataWrapper<GenericDataContainer<Hero>> = JSON.parse(
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
    currentRequestMarvel = await updateRequestMarvel({
      repository: repositoryRequestMarvel,
      requestMarvel: currentRequestMarvel,
    });
    const { data }: GenericDataWrapper<GenericDataContainer<Hero>> = JSON.parse(json);
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
                ? convert(character.description.replace(/\n/g, ' '))
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
        .into(SummarySeries)
        .values(
          character.series.items.map((item) => {
            return {
              idCharacter: character.id,
              idSerie: Number(item?.resourceURI?.split('/').pop()),
            };
          }),
        )
        .printSql()
        .execute();
      console.log(`\n${character.name} series inserted`);
    }
  }
};
