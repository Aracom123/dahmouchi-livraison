import { Magasin } from "./magasin.model";


export interface Transfert{
  idTransfert: number;
  magasin_depart: Magasin;
  magasin_arrive: Magasin;
  created_by: JSON;
  created_at: Date;
  modified_by: JSON;
  modified_at: Date;
}