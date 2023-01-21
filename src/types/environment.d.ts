declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_KEY_MARVEL: string;
      PRIVATE_KEY_MARVEL: string;
    }
  }
}

export {};
