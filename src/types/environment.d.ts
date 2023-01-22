declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_KEY_MARVEL: string;
      PRIVATE_KEY_MARVEL: string;
      DATABASE_PORT: number;
      DATABASE_HOST: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_TYPE: 'postgres' | 'mysql';
      DATABASE_NAME: string;
    }
  }
}

export {};
