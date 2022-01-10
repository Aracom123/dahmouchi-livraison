export enum PRODUCTACTIONTYPES{
  GET_ALL_PRODUCTS="[Product] get All Products",
  GET_SELECTED_PRODUCTS="[Product] get SELECTED Products",
  GET_AVAILABLE_PRODUCTS="[Product] get AVAILABLE Products",
  SEARCH_PRODUCTS="[Product] Search Products",
  NEW_PRODUCT="[Product] New Products",
}

export interface ActionEvent{
  type: PRODUCTACTIONTYPES,
  payload?: any
}

export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T>{
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string
}