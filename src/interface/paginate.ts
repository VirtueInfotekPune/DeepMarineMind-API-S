import { Model } from "mongoose";

interface paginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
    totalPages: number;
    pagingCounter: number;
    offset?: number; // Optional, depending on usage
}


export interface PaginateModel<T> extends Model<T> {
    paginate: (filter: any, options: any) => Promise<paginateResult<T>>;
    aggregatePaginate: (aggregate: any, options: any) => Promise<any>;
}
