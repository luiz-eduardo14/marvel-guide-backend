/* eslint-disable no-async-promise-executor */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { AppDataSource } from '../database/data-source.js';
import envFile from 'dotenv';
import { PopulateCharactersScript } from 'src/scripts/character.js';
import { DataSource } from 'typeorm';
envFile.config();

const successExit = 0;

interface scriptObject {
  script: (database: DataSource) => Promise<void>;
  name: string;
}

export function ScriptsRunnerDatabase(
  scriptObjectArray: scriptObject[],
): Promise<void> {
  return new Promise<void>(async (_resolve, reject) => {
    try {
      const database = await AppDataSource.initialize();
      const migratiosList = await database.runMigrations({
        transaction: 'all',
      });
      migratiosList.forEach((migration) => {
        console.log(`Migration ${migration.name} executed`);
      });
      scriptObjectArray.forEach((script) =>
        script
          .script(database)
          .then(() => {
            console.log(`Script ${script.name} executed`);
          })
          .catch((error) => {
            console.log(error);
          }),
      );
      process.exit(successExit);
    } catch (error) {
      reject(error);
    }
  });
}

const scrips = [
  {
    name: 'PopulateCharactersScript',
    script: PopulateCharactersScript,
  },
];

ScriptsRunnerDatabase(scrips);
