import { Produit } from "./produit.model";

export class CheckList{
  id_liste_produits_reception?: number;
  produit?:Produit;
  url?:string;
  quantity?: number;
  prix_unitaire?: number;
  est_receptionne?: boolean;  
  old_receptionne?: boolean;
}