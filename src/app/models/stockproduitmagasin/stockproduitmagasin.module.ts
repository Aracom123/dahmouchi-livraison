import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit } from '../produit.model';
import { Magasin } from '../magasin.model';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StockproduitmagasinModule {
  
  id_magasin?:number;
  quantity?:number;
  produit?:Produit;
  magasin?:Magasin;
  seuil?: number;

}
