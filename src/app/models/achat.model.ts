import { Fournisseur } from "./fournisseur.model";
import { ListProduitAchat } from "./liste_produits_achat.model";

export class Achat {
  id_achat?: number;
  fournisseur?: Fournisseur;
  date_achat?: Date;
  liste_produits_achat?: JSON;
  created_by?: JSON;
  created_at?: Date;
  modified_by?: JSON;
  modified_at?: Date;
}