export enum GROUPEACTIONACTIONTYPES{
  GET_ALL_GROUPE_ACTIONS="[Groupe_Action] get All Groupe_actions",
  GET_SELECTED_GROUPE_ACTIONS="[Groupe_Action] get SELECTED Groupe_actions",
  GET_AVAILABLE_GROUPE_ACTIONS="[Groupe_Action] get AVAILABLE Groupe_actions",
  SEARCH_GROUPE_ACTIONS="[Groupe_Action] Search Groupe_actions",
  NEW_GROUPE_ACTION="[Groupe_Action] New Groupe_action",
}

export interface ActionEvent{
  type: GROUPEACTIONACTIONTYPES,
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