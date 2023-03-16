import { ComicSummary } from './ComicSummary.js';
import { DataList } from './DataList.js';
import { EventSummary } from './EventSummary.js';
import { Image } from './Image.js';
import { SeriesSummary } from './SeriesSummary.js';
import { StorySummary } from './StorySummary.js';
import { Url } from './Url.js';

export interface Hero {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls?: Url[];
  thumbnail?: Image;
  comics?: DataList<ComicSummary>;
  stories?: DataList<StorySummary>;
  events?: DataList<EventSummary>;
  series?: DataList<SeriesSummary>;
}
