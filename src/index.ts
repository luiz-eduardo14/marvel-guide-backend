import { Axios } from 'axios';
import md5 from 'md5';
import envFile from 'dotenv';
import { writeFileSync, readFileSync } from 'fs';
envFile.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const marvelApi = new Axios({
    baseURL:'http://gateway.marvel.com',

});

const PRIVATE_KEY_MARVEL = process.env.PRIVATE_KEY_MARVEL;
const PUBLIC_KEY_MARVEL = process.env.PUBLIC_KEY_MARVEL;
const timestamp = Number(new Date());

const md5Hash = md5(timestamp + PRIVATE_KEY_MARVEL + PUBLIC_KEY_MARVEL);

console.log(md5Hash);

const jsonFile = JSON.parse(readFileSync(__dirname+'/test.json').toString());

var countStories = 0;

jsonFile.forEach((hero) => {
    countStories = countStories + hero.series.items.length;
    console.log('hero: '+hero.name);
    console.log(hero.series.items);    
});

console.log(countStories);



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
