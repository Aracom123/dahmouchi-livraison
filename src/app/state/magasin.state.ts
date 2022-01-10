export enum MAGASINACTIONTYPES{
  GET_ALL_MAGASINS="[Magasin] get All Magasins",
  GET_SELECTED_MAGASINS="[Magasin] get SELECTED Magasins",
  GET_AVAILABLE_MAGASINS="[Magasin] get AVAILABLE Magasins",
  SEARCH_MAGASINS="[Magasin] Search Magasins",
  NEW_MAGASIN="[Magasin] New Magasin",
}

export interface ActionEvent{
  type: MAGASINACTIONTYPES,
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