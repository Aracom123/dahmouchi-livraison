import { Achat } from "./achat.model";
import { CheckList } from "./checklist.model";
import { Magasin } from "./magasin.model";

export class ReceptionListe{
  idReception?: number;
  achat?: Achat;
  magasin?: Magasin;
  created_at?:Date;
  checkedList?:CheckList[];
}