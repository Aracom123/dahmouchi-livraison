import { Achat } from "./achat.model";
import { Produit } from "./produit.model";
import { Retour } from "./retour.model";

export class ListeProduitsRetour{
  id_liste_produits_retour?:number;
  motif?: string;
  achat?: Achat;
  produit?: Produit;
  retour?:Retour;
  quantity?: number;
  prix_unitaire?: number;
  est_retourne?: boolean;
  url?: string;
}