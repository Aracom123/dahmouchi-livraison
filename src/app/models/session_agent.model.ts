import { User } from "./User.model";
import { Vente } from "./vente.model";

export class SessionAgent{
  idSessionAgent?: number;
  montantSession?: number;
  montantReelEncaisse?: number;
  liste_ventes?: JSON;
  vendeur?: User;
  dateSession?: Date;
  created_at?: Date;
  created_by?: String;
}