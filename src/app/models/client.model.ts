export class Client{
  idClient?: number;
  email?: string;
  login?: string;
  nom?: string;
  numero?: number;
  password?: string;
  prenom?: string;
  statut?: boolean;
  ninia?: string;
  rccm?: string;
  type?: string;
  created_by?: JSON;
  created_at?: Date;
  modified_by?: JSON;
  modified_at?: Date;

  constructor(){

  }
  
  // constructor(numero: number, email: string, nom: string, prenom: string, type: string, rccm:string, ninia: string){
  //   this.numero = numero;
  //   this.email = email;
  //   this.nom =   nom;
  //   this.prenom =   prenom;
  //   this.type =   type;
  //   this.rccm =   rccm;
  //   this.ninia =   ninia;
  // }
}
  