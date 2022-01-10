export enum ACHATACTIONTYPES{
  GET_ALL_ACHATS="[Achat] get All Achats",
  GET_SELECTED_ACHATS="[Achat] get SELECTED Achats",
  GET_AVAILABLE_ACHATS="[Achat] get AVAILABLE Achats",
  SEARCH_ACHATS="[Achat] Search Achats",
  NEW_ACHAT="[Achat] New Achat",
}

export interface ActionEvent{
  type: ACHATACTIONTYPES,
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