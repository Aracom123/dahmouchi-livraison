import { Livraison } from "./livraison.model";

export class Colis{
    idColis?: number;
    codeColis?: string;
    nature?: string;
    valeurColis?: number;
    description?: string;
    livraison?: Livraison;
    quantite?: number;
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;  
}