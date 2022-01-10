import { Action } from "./action.model";

export interface GroupeAction{
  id_group: number;
  libelle: string;
  actions: Action[];
}