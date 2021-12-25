export interface IAction<T extends string, P> {
  type: T,
  payload: P
}

export interface IPureAction<T extends string> {
  type: T
}