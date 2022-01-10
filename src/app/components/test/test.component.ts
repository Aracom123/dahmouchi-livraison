import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';

//import { environment } from '../../environments/environment';

import { Produit } from 'src/app/models/produit.model';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  public scannerEnabled: boolean = true;
  public produits: Produit[] = [];
  public information: string = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  //barcodeValue: any;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  // @ViewChild(BarcodeScannerLivestreamComponent)
  // barcodeScanner?: BarcodeScannerLivestreamComponent;
 
  // ngAfterViewInit() {
  //   this.barcodeScanner.start();
  // }
 
  // onValueChanges(result) {
  //   this.barcodeValue = result.codeResult.code;
  // }
 
  // onStarted(started) {
  //   console.log(started);
  // }

  // public scanSuccessHandler($event: any) {
  //   this.scannerEnabled = false;
  //   this.information = "Espera recuperando información... ";
  //   console.log($event.target.value);
  //   //const produit = new Produit($event);
    
  // }

  // public enableScanner() {
  //   this.scannerEnabled = !this.scannerEnabled;
  //   this.information = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  // }

}
