import { IProduct } from './product';

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}
//for caching
export class Pagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[] = [];
}

