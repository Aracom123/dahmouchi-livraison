export enum VENTEACTIONTYPES{
  GET_ALL_VENTES="[Vente] get All Ventes",
  GET_SELECTED_VENTES="[Vente] get SELECTED Ventes",
  GET_AVAILABLE_VENTES="[Vente] get AVAILABLE Ventes",
  SEARCH_VENTES="[Vente] Search Ventes",
  NEW_VENTE="[Vente] New Vente",
}

export interface ActionEvent{
  type: VENTEACTIONTYPES,
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