export enum USERACTIONTYPES{
  GET_ALL_USERS="[User] get All Users",
  GET_SELECTED_USERS="[User] get SELECTED Users",
  GET_AVAILABLE_USERS="[User] get AVAILABLE Users",
  SEARCH_USERS="[User] Search Users",
  NEW_USER="[User] New User",
}

export interface ActionEvent{
  type: USERACTIONTYPES,
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