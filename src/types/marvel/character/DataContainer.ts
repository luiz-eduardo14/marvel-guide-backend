import { Hero } from './Hero';

export interface CharacterContainer {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: Hero[];
}
