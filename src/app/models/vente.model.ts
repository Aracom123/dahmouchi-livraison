import { ListeProduitsVente } from "src/app/models/liste_produits_vente.model";
import { Client } from "./client.model";
import { Magasin } from "./magasin.model";

export class Vente{
  idVente?: number;
  liste_produits_vente: ListeProduitsVente[] = [];
  montant_due: number = 0;
  montant_encaisse: number = 0;
  reduction: number = 0;
  client?: Client = new Client();
  magasin: Magasin =  new Magasin();
  monaie: number = 0;
  reste_a_payer: number = 0;
  somme_recu: number = 0;
  est_cloture: boolean = false;
  created_by?: JSON;
  created_at: Date = new Date();
  modified_by?: JSON;
  modified_at: Date = new Date();
}