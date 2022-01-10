import { Magasin } from "./magasin.model";
import { Produit } from "./produit.model";
import { Vente } from "./vente.model";

export class ListeProduitsVente{
  id_liste_produits_vente?: number;
  produit: Produit = new Produit;
  quantity: number = 0;
  prix_unitaire: number = 0;
  vente?: Vente;
  magasin?: Magasin;
  total?: number;
}

// export class ListeProduitsVente{
//   id_liste_produits_vente?: number;
//   produit?: Produit;
//   quantity?: number;
//   prix_unitaire?: number;
//   vente?: Vente;
//   magasin?: Magasin;
//   total?: number;
// }