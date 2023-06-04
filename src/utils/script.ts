/* eslint-disable no-async-promise-executor */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { AppDataSource } from '../database/data-source';
import envFile from 'dotenv';
import { ScriptsRunners } from '../entities/scriptsRunners';
import { PopulateCharactersScript } from '../scripts/character';
import { DataSource } from 'typeorm';
import { PopulateSeriesScript } from '../scripts/serie';
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
      const isRunningScripts = await database
        .createQueryBuilder(ScriptsRunners,'scriptsRunners')
        .getMany();
      const scripsWithoutRun = scriptObjectArray.filter(script => {
        return !isRunningScripts.find(scriptRun => scriptRun.name === script.name);
      });
      for (const scriptObject of scripsWithoutRun) {
        try {
          await scriptObject.script(database);
          await database.createQueryBuilder()
                .insert()
                .into(ScriptsRunners)
                .values([
                  {
                    name: scriptObject.name,
                    time: new Date(),
                  }
                ])
                .printSql()
                .execute();
          console.log(`Script ${scriptObject.name} executed`);
        } catch (error) {
          console.log(error);
        }
      }
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
  {
    name: 'PopulateSeriesScript',
    script: PopulateSeriesScript,
  }
];

ScriptsRunnerDatabase(scrips).then(() => {
  console.log('Scripts executed');
});
