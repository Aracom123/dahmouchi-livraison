import { Service } from "./service.model";

export class Depense{
    idDepense?: number;
    montant?: number;
    reference?: string;
    date?: Date;
    service?: Service;
    created_by?: JSON;
    created_at?: Date;
    modified_by?: JSON;
    modified_at?: Date;
  }