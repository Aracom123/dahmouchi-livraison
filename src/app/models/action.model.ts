import { GroupeAction } from "./groupeaction.model";

export interface Action{
  id_action: number;
  icon: string;
  libelle: string;
  url: string;
  groupe: GroupeAction;
}