export interface CollectionRes<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface FilterDTO {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  search?: string;
  startAt?: Date;
  endAt?: Date;
  type?: string;
}
