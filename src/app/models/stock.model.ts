import { Magasin } from "./magasin.model";
import { Produit } from "./produit.model";

export class Stock{
  id_magasin?:number;
  quantity?:number;
  produit?:Produit;
  magasin?:Magasin;
  seuil?: number;
}