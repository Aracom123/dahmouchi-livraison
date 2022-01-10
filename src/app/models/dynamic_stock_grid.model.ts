import { Produit } from "./produit.model";

export interface DynamicStockGrid{   
  produit: Produit;
  quantityInstock:number;
  quantityTransfert:number;
  index: number;
}