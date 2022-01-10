import { Fournisseur } from "./fournisseur.model";
import { Achat } from "./achat.model";



export class ReglementFournisseur{
  idReglement?: number;
  montantVerse?: number;
  type?: string;
  reference_cheque?: string;
  fournisseur?: Fournisseur;
  achat?: Achat;
  created_by?: JSON;
  created_at?: Date;
  modified_by?: JSON;
  modified_at?: Date;
}