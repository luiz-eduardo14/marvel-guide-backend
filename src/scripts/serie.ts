import md5 from "md5";
import { Serie } from "../types/marvel/series/Serie.js";
import {} from '../entities/index.js'
import { marvelApi } from "../utils/api/marvel.js";
import { DataSource } from "typeorm";
import { GenericDataWrapper } from "../types/marvel/GenericDataWrapper.js";
import { GenericDataContainer } from "../types/marvel/GenericDataContainer.js"
import { getCurrentDatabaseRequestMarvel, updateRequestMarvel } from "../utils/requestMarvelUtil.js";
import { RequestMarvel } from '../entities/requestMarvel.js'
import JsDom from 'jsdom';
import { Serie as SerieEntity } from "../entities/serie.js";

const getIssueDescriptionMarvel = async (url: string): Promise<string | undefined> => {
    const htmlMarvelString = await marvelApi.get(url);
    const htmlMarvel = new JsDom.JSDOM(htmlMarvelString.data);
    const documentHTML = htmlMarvel.window.document;
    const description = documentHTML.querySelector('.featured-item-desc');
    const descriptionText = description?.lastElementChild?.textContent?.trim();
    return descriptionText;
};


export const PopulateSeriesScript = async (database: DataSource) => {
    const PRIVATE_KEY_MARVEL = process.env.PRIVATE_KEY_MARVEL;
    const PUBLIC_KEY_MARVEL = process.env.PUBLIC_KEY_MARVEL;
    const timestamp = Number(new Date());
  
    const md5Hash: string = md5(
      String(timestamp) + PRIVATE_KEY_MARVEL + PUBLIC_KEY_MARVEL,
    );

    let currentRequestMarvel = await getCurrentDatabaseRequestMarvel(database);

    const repositoryRequestMarvel = database.getRepository(RequestMarvel);
  
    const urlRequest = `/v1/public/series?ts=${timestamp}&apikey=${PUBLIC_KEY_MARVEL}&hash=${md5Hash}&seriesType=collection&orderBy=startYear`;
    
    const { data } = await marvelApi.get<string>(urlRequest);
    currentRequestMarvel = await updateRequestMarvel({
        repository: repositoryRequestMarvel,
        requestMarvel: currentRequestMarvel,
      });
    const seriesContainer: GenericDataWrapper<GenericDataContainer<Serie>> = JSON.parse(data);

    const seriesRepository = database.getRepository(SerieEntity);
        
    const totalSeries: number = seriesContainer?.data?.total ?? 0;

    for (let index = 0; Math.ceil(totalSeries / 100); index++) {
        const offset = index === 0 ? index * 100 : index * 100 + 1;
        const { data: json } = await marvelApi.get(
          `${urlRequest}&limit=100&offset=${offset}`,
          {},
        );
        currentRequestMarvel = await updateRequestMarvel({
          repository: repositoryRequestMarvel,
          requestMarvel: currentRequestMarvel,
        });
        const data: GenericDataWrapper<GenericDataContainer<Serie>> = JSON.parse(json);
        if(data?.data?.results){
          const allSeriesDataBaseIdOrigin = (await seriesRepository.find()).map(serie => serie.idOrigin);
          const dataResultsFilter = data.data.results.filter(serie => 
            serie?.urls && serie?.urls[0]?.url && (serie.characters?.available ?? 0) > 0
            && !allSeriesDataBaseIdOrigin.includes(serie.id));
          for (const serie of dataResultsFilter) {
            if(serie?.urls){
              const description = await getIssueDescriptionMarvel(serie.urls[0].url);
              await seriesRepository.save({
                idOrigin: serie.id,
                title: serie.title,
                description: description,
                startYear: serie.startYear,
                endYear: serie.endYear,
                rating: serie.rating,
                imageURL: serie.thumbnail?.path + '.' + serie.thumbnail?.extension,
                resourceURI: serie.resourceURI
              })
            }
          }
        }    
    }
}; 