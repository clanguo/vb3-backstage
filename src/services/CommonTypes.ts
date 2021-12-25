export interface ResponseData<T> {
  err: null,
  data: T
}

export interface ResponseError {
  err: string,
  data: null
}

export interface ResponsePageData<T> {
  data: T[],
  err: null,
  count: number
}

export interface ResponsePageError {
  data: [],
  err: string,
  count: 0
}

export type ResponseResult<T> = ResponseData<T> | ResponseError;
export type ResponsePageResult<T> = ResponsePageData<T> | ResponsePageError;