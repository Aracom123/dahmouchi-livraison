import { Vente } from "./vente.model";
import { Reglement } from "./reglement.model";

export class Facture{
  id_facture?: number;
  montant_due?:number;
  montant_encaisse?:number;
  reste_a_payer?:number;
  somme_recu?:number;
  monaie?:number;
  reduction?:number;
  vente?: Vente;
  reglements?:Reglement;
  created_by?: JSON;
  created_at?: Date;
  modified_by?: JSON;
  modified_at?: Date;
}