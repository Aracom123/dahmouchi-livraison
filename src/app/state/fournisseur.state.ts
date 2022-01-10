export enum FOURNISSEURACTIONTYPES{
  GET_ALL_FOURNISSEURS="[Fournisseur] get All Fournisseurs",
  GET_SELECTED_FOURNISSEURS="[Fournisseur] get SELECTED Fournisseurs",
  GET_AVAILABLE_FOURNISSEURS="[Fournisseur] get AVAILABLE Fournisseurs",
  SEARCH_FOURNISSEURS="[Fournisseur] Search Fournisseurs",
  NEW_FOURNISSEUR="[Fournisseur] New Fournisseur",
}

export interface ActionEvent{
  type: FOURNISSEURACTIONTYPES,
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