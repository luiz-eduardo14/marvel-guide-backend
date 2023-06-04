import { ComicSummary } from "../ComicSummary";
import { DataList } from "../DataList";
import { EventSummary } from "../EventSummary";
import { Image } from "../Image";
import { SeriesSummary } from "../SeriesSummary";
import { StorySummary } from "../StorySummary";
import { CharacterSummary } from '../CharacterSummary';
import { Url } from "../Url";

export interface Serie {
    id: number;
    title: string;
    description: string;
    modified: Date;
    resourceURI: string;
    urls?: Url[];
    thumbnail?: Image;
    comics?: DataList<ComicSummary>;
    stories?: DataList<StorySummary>;
    events?: DataList<EventSummary>;
    characters?: DataList<CharacterSummary>;
    startYear?: number;
    endYear?: number;
    rating?: string;
    next?: DataList<SeriesSummary>
    previous?: DataList<SeriesSummary>
  }