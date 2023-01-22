import { ComicSummary } from './ComicSummary';
import { DataList } from './DataList';
import { EventSummary } from './EventSummary';
import { Image } from './Image';
import { SeriesSummary } from './SeriesSummary';
import { StorySummary } from './StorySummary';
import { Url } from './Url';

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
