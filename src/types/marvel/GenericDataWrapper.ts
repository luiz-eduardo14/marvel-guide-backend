export interface GenericDataWrapper<T> {
  code?: number;
  status?: string;
  data?: T;
  etag?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
}
