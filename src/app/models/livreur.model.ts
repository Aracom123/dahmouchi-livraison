import { MaterielRoulant } from "./mat-roulant.model";

export class Livreur{
    idLivreur?: number;
    email?: string;
    login?: string;
    nom?: string;
    prenom?: string;
    numero?: number;
    motdepasse?: string;
    adresse?: string;
    materielRoulant?: MaterielRoulant;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
}