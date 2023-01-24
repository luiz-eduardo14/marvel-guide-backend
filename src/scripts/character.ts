import { Axios } from 'axios';
import md5 from 'md5';
import envFile from 'dotenv';
import { AppDataSource } from '../data-source.js';
import { CharacterDataWrapper } from 'types/marvel/character/CharacterDataWrapper.js';
envFile.config();

(async () => {
  const database = await AppDataSource.initialize();
  await database.runMigrations();

  console.log('success database');

  // const marvelApi = new Axios({
  //   baseURL: 'http://gateway.marvel.com'

  // });

  // const PRIVATE_KEY_MARVEL = process.env.PRIVATE_KEY_MARVEL;
  // const PUBLIC_KEY_MARVEL = process.env.PUBLIC_KEY_MARVEL;
  // const timestamp = Number(new Date());

  // const md5Hash: string = md5(String(timestamp) + PRIVATE_KEY_MARVEL + PUBLIC_KEY_MARVEL);

  // const urlRequest = `/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY_MARVEL}&hash=${md5Hash}`;

  // const { data: json } = await marvelApi.get(`${urlRequest}&limit=1&offset=0`, {});

  // const resultRequestCharacter: CharacterDataWrapper = JSON.parse(json as string);

  // if (resultRequestCharacter.code !== 200) {
  //   throw new Error(resultRequestCharacter.status);
  // }

  // const totalHeroes: number = resultRequestCharacter?.data?.total ?? 0;

  // for (let index = 0; index < Math.ceil(totalHeroes / 100); index++) {
  //   const offset = index === 0 ? index * 100 : (index * 100) + 1;

  //   const { data: json } = await marvelApi.get(`${urlRequest}&limit=100&offset=${offset}`, {});
  //   const { data }: CharacterDataWrapper = JSON.parse(json);
  //   // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  //   if (!data) {
  //     throw new Error('Data not found');
  //   }
  // }
})().then(() => {
  console.log('\nsuccess');
}).catch((error: Error) => {
  console.log(error.message);
});

// (async () => {
//     const urlRequest = `/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY_MARVEL}&hash=${md5Hash}`;

//     const { data: json, } = await marvelApi.get(`${urlRequest}&limit=1&offset=0`,{})
//     const totalHeroes: number = JSON.parse(json as string).data.total;

//     const result = [];

//     for (let index = 0; index < Math.ceil(totalHeroes / 100); index++) {
//         const offset = index === 0 ? index * 100 : (index * 100) + 1;

//         const { data: json, } = await marvelApi.get(`${urlRequest}&limit=100&offset=${offset}`,{})
//         const { data } = JSON.parse(json);
//         const resultsArray: any[] = data.results;

//         // @ts-ignore
//         result.push(...resultsArray)
//     }
//     writeFileSync(__dirname + '/test.json',JSON.stringify(result));
// })();
