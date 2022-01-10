export enum ACTIONACTIONTYPES{
  GET_ALL_ACTIONS="[Action] get All Actions",
  GET_SELECTED_ACTIONS="[Action] get SELECTED Actions",
  GET_AVAILABLE_ACTIONS="[Action] get AVAILABLE Actions",
  SEARCH_ACTIONS="[Action] Search Actions",
  NEW_ACTION="[Action] New Action",
}

export interface ActionEvent{
  type: ACTIONACTIONTYPES,
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