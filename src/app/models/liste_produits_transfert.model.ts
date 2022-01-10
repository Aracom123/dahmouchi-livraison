import { Produit } from "./produit.model";
import { Transfert } from "./transfert.model";


export class ListeProduitsTransfert{
  id_liste_produits_transfert?: number;
  produit?: Produit;
  quantity?: number;
  transfert?: Transfert;
}