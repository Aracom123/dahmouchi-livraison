import { Achat } from "./achat.model";
import { Magasin } from "./magasin.model";

export class Reception{
  idReception?: number;
  achat?: Achat;
  magasin?: Magasin;
  created_at?:Date;
}