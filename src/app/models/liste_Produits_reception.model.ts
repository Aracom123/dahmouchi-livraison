import { Achat } from "./achat.model";
import { Magasin } from "./magasin.model";
import { Produit } from "./produit.model";
import { Reception } from "./reception.model";


export class ListProduitReception{
  id_liste_produits_reception?: number;
  reception?: Reception;
  produit?:Produit;
  codeProduit?:string;
  achat?:Achat;
  magasin?:Magasin
  quantity?: number;
  prix_unitaire?: number;
  est_receptionne?: boolean;
  url?:string; 
}