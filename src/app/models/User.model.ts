import { Profile } from "./profile.model";

export class User{
  id?: number;
  email?: string;
  login?: string;
  nom?: string;
  numero?: number;
  motdepasse?: string;
  prenom?: string;
  statut?: boolean;
  profile?: Profile;
  created_by?: string;
  created_at?: Date;
  modified_by?: string;
  modified_at?: Date;  
}