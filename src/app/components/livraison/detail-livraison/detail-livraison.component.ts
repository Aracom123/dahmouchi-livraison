import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/models/client.model';
import { Colis } from 'src/app/models/colis.model';
import { CompagniePartenaire } from 'src/app/models/compagnie.model';
import { Livraison } from 'src/app/models/livraison.model';
import { Livreur } from 'src/app/models/livreur.model';
import { ClientService } from 'src/app/services/client.service';
import { ColisService } from 'src/app/services/colis.service';
import { CommunService } from 'src/app/services/commun.service';
import { CompagnieService } from 'src/app/services/compagnie.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import { LivreurService } from 'src/app/services/livreur.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-livraison',
  templateUrl: './detail-livraison.component.html',
  styleUrls: ['./detail-livraison.component.css']
})
export class DetailLivraisonComponent implements OnInit {

  public currentPage:number = 0;
  public size:number=10;
  public totalPages:number = 0;
  public pages?: Array<number>;
  livreurs: any;
  compagniePartenaires: any;

  idLivraison: number = 0;
  livraison: Livraison = new Livraison();

  baseUrl = environment.adminUrl;

  constructor(private livraisonService: LivraisonService, private colisService: ColisService, private livreurService: LivreurService, private clientService: ClientService, private compagnieService: CompagnieService,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private modalService: NgbModal,private communService: CommunService, private router: Router) {

  }

 ngOnInit(): void {
   this.onGetAllCompagniePartenaires();
   let url = atob(this.activatedRoute.snapshot.params.url);
   this.idLivraison = this.communService.getObjectId(url);
   this.onGetLivraison();
 }

 onGetLivraison(){
    this.livraisonService.getLivraisons(this.idLivraison).subscribe(dataLivraison => {
      // console.log(dataLivraison);
      let lvrson = dataLivraison;

      // let urlClient = lvrson._links.client.href;
      // console.log(urlClient);     
      // this.communService.getItem(urlClient).subscribe(dataClient => {
      //   let cl = new Client();
      //   cl = dataClient;
      //   cl.idClient = Number(this.communService.getObjectId(dataClient._links.self.href));
      //   lvrson.client = cl;
      //   // console.log(liv);
      // });

      // let urlLivreur = lvrson._links.livreur.href;        
      // this.communService.getItem(urlLivreur).subscribe(dataLivreur => {
      //   let livreur = new Livreur();
      //   livreur = dataLivreur;
      //   livreur.idLivreur = Number(this.communService.getObjectId(dataLivreur._links.self.href));
      //   lvrson.livreur = livreur;
      // });

      // let urlCompagnie = lvrson._links.compagniePartenaire.href;        
      // this.communService.getItem(urlCompagnie).subscribe(dataCompagnie => {
      //   let compagniePartenaire = new CompagniePartenaire();
      //   compagniePartenaire = dataCompagnie;
      //   compagniePartenaire.idCompagnie = Number(this.communService.getObjectId(dataCompagnie._links.self.href));
      //   lvrson.compagniePartenaire = compagniePartenaire;
      //   // console.log(liv);
      // });

      // let urlColis = lvrson._links.colis.href;        
      // this.communService.getItem(urlColis).subscribe(dataColis => {
      //   let colis = new Colis();
      //   colis = dataColis._embedded.colis;
      //   // colis.idColis = Number(this.communService.getObjectId(dataColis._links.self.href));
      //   lvrson.colis = colis;
      //   // console.log(liv);
      // });

      this.livraison = lvrson;
    })
  } 

//  onGetAllLivreurs(){
//    this.livreurService.getAllLivreurs(this.currentPage, this.size).subscribe(data => {
//     //  console.log(data);
//      this.livreurs = data._embedded.livreurs;
//    })
//  }

 onGetAllCompagniePartenaires(){
   this.compagnieService.getAllCompagniePartenaires(this.currentPage, this.size).subscribe(data => {
     // console.log(data);
     this.compagniePartenaires = data._embedded.compagniePartenaires;
   })
 }
    
 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return `with: ${reason}`;
   }
 }
 
  onGetCompagnie() { 
    this.compagnieService.getAllCompagniePartenaires(0, 25).subscribe(data=>{
      this.compagniePartenaires = data._embedded.compagniePartenaires;
    //  console.log(this.compagniePartenaires); 
    });
  }
  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }

}
