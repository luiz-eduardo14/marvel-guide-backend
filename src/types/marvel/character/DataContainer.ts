import { Hero } from './Hero.js';

export interface CharacterContainer {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: Hero[];
}
