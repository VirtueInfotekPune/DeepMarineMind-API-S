import { Model } from "mongoose";

interface paginateResult<T>  {
    docs: T[];
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
}

export interface PaginateModel<T> extends Model<T> {
    paginate: (filter: any, options: any) => Promise<paginateResult<T>>;
    aggregatePaginate: (aggregate: any, options: any) => Promise<any>;
}