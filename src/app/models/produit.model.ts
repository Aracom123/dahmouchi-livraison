export class Produit{
  idProduit?: number;
  codeProduit: string = '';
  dateExpiration: Date  = new Date();
  dateFabrication: Date  = new Date();
  description: string ='';
  liebelle: string = '';
  prixAchat: number = 0;
  prixVente: number = 0;
  tva: number = 0;
  url:string ='';
  created_by?: JSON;
  created_at?: Date;
  modified_by?: JSON;
  modified_at?: Date;
}

// export class Produit{
//   idProduit?: number = 0;
//   codeProduit?: number;
//   dateExpiration?: Date;
//   dateFabrication?: Date;
//   description?: string;
//   liebelle?: string;
//   prixAchat?: number;
//   prixVente?: number;
//   tva?: number;
//   url?:string;
//   created_by?: JSON;
//   created_at?: Date;
//   modified_by?: JSON;
//   modified_at?: Date;
// }