import { Axios } from "axios";

export const marvelApi = new Axios({
    baseURL: 'http://gateway.marvel.com',
  });