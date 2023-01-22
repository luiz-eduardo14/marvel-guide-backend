export interface DataList<T> {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: T[];
}
