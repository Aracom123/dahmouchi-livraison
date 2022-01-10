export enum LISTEPRODUITSACHATACTIONTYPES{
  GET_ALL_LISTPRODUITSACHAT="[List_produit_achat] get All List_produit_achat",
  GET_SELECTED_LISTPRODUITSACHAT="[List_produit_achat] get SELECTED List_produit_achat",
  GET_AVAILABLE_LISTPRODUITSACHAT="[List_produit_achat] get AVAILABLE List_produit_achat",
  SEARCH_LISTPRODUITSACHAT="[List_produit_achat] Search List_produit_achat",
  NEW_LISTPRODUITSACHAT="[List_produit_achat] New List_produit_achat",
}

export interface ActionEvent{
  type: LISTEPRODUITSACHATACTIONTYPES,
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