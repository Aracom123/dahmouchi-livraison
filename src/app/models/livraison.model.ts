import { Client } from "./client.model";
import { Colis } from "./colis.model";
import { CompagniePartenaire } from "./compagnie.model";
import { Livreur } from "./livreur.model";

export class Livraison{
    idLivraison?: number;
    dateLivraison: Date = new Date();
    fraisLivraison: number = 0;
    adresseLivraison: string = '';
    client: Client = new Client();
    livreur: Livreur = new Livreur();
    colis: Colis[] = [];
    compagniePartenaire: CompagniePartenaire = new CompagniePartenaire;
    adresse: string = '';
    created_by?: string;
    created_at?: Date;
    modified_by?: string;
    modified_at?: Date;
}