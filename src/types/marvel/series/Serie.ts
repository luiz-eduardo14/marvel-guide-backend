import { ComicSummary } from "../ComicSummary.js";
import { DataList } from "../DataList.js";
import { EventSummary } from "../EventSummary.js";
import { Image } from "../Image.js";
import { SeriesSummary } from "../SeriesSummary.js";
import { StorySummary } from "../StorySummary.js";
import { CharacterSummary } from '../CharacterSummary.js';
import { Url } from "../Url.js";

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