export enum CLIENTACTIONTYPES{
  GET_ALL_CLIENTS="[Client] get All Clients",
  GET_SELECTED_CLIENTS="[Client] get SELECTED Clients",
  GET_AVAILABLE_CLIENTS="[Client] get AVAILABLE Clients",
  SEARCH_CLIENTS="[Client] Search Clients",
  NEW_CLIENT="[Client] New Client",
}

export interface ActionEvent{
  type: CLIENTACTIONTYPES,
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