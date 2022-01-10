import { Achat } from "./achat.model";
import { Produit } from "./produit.model";

export class ListProduitAchat{
  id_list_achat?: number;
  quantity?: number;
  prix_unitaire?: number;
  produit?: any;
  achat?: Achat;
  est_receptionne?: boolean;  
  est_retourne?: boolean;  
  url?:string;
}