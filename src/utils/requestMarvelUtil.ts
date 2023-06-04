import { DataSource, Repository } from 'typeorm';
import { RequestMarvel } from '../entities/requestMarvel';

async function getCurrentDatabaseRequestMarvel(database: DataSource): Promise<RequestMarvel> {
    const marvelRepository = database.getRepository(RequestMarvel);
    let currentRequestMarvel = await marvelRepository.findOne({ where: {
      requestDate: new Date(),
    }});

    if(currentRequestMarvel === null){
      currentRequestMarvel = await marvelRepository.save({
        requestCount: 0,
        requestDate: new Date(),
      });
    }

    return currentRequestMarvel
}

function isRequestLimit(RequestMarvel: RequestMarvel): boolean {
    return RequestMarvel.requestCount >= Number(process.env?.LIMIT_REQUEST ?? 3000) - 1;
}

async function updateRequestMarvel({
    repository,
    requestMarvel,
}: {
    repository: Repository<RequestMarvel>;
    requestMarvel: RequestMarvel;
}) {
    if(requestMarvel.id === undefined) throw new Error('RequestMarvel id is undefined');
    if(isRequestLimit(requestMarvel)) throw new Error('RequestMarvel requestCount is greater than limit');
    return await repository.save({...requestMarvel, requestCount: requestMarvel.requestCount + 1});
}

export { getCurrentDatabaseRequestMarvel, updateRequestMarvel };