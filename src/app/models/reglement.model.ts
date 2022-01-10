import { Facture } from "./facture.model";
import { Vente } from "./vente.model";
import { Client } from "./client.model";


export class Reglement{
  idReglement?: number;
  montantVerse?: number;
  type?: string;
  reference_cheque?: string;
  facture?: Facture;
  client?:Client;
  vente?: Vente;
  created_by?: JSON;
  created_at?: Date;
  modified_by?: JSON;
  modified_at?: Date;
}