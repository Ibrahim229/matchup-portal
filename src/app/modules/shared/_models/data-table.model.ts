export interface IDataTable<T> {
  length: number;
  pageIndex: number;
  pageSize?: number;
  emptyState?: string;
  data: T[];
}
