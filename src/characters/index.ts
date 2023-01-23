import { Axios } from 'axios';
import md5 from 'md5';
import envFile from 'dotenv';
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'reflect-metadata';
import { Hero } from 'types/marvel/character/Hero';
envFile.config();
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const marvelApi = new Axios({
  baseURL: 'http://gateway.marvel.com'

});

const PRIVATE_KEY_MARVEL = process.env.PRIVATE_KEY_MARVEL;
const PUBLIC_KEY_MARVEL = process.env.PUBLIC_KEY_MARVEL;
const timestamp = Number(new Date());

const md5Hash = md5(String(timestamp) + PRIVATE_KEY_MARVEL + PUBLIC_KEY_MARVEL);

console.log(md5Hash);

const listHeroes: Hero[] = JSON.parse(readFileSync(_dirname + '/test.json').toString());

const countStories = 0;

listHeroes.forEach((hero) => {
  console.log(hero.name.trim());
});

console.log(listHeroes.length);

console.log();

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
