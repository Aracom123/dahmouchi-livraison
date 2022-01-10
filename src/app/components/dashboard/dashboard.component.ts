import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { Colis } from 'src/app/models/colis.model';
import { CompagniePartenaire } from 'src/app/models/compagnie.model';
import { Livreur } from 'src/app/models/livreur.model';
import { Stock } from 'src/app/models/stock.model';
import { Vente } from 'src/app/models/vente.model';
import { AchatService } from 'src/app/services/achat.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { CommunService } from 'src/app/services/commun.service';
import { DepenseService } from 'src/app/services/depense.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  baseUrl =  '';

  ventes?: any;
  TTventes = new Vente();
  montant_dueTT:number = 0;
  montant_encaisseTT:number =  0;
  reductionTT:number = 0;
  somme_recuTT:number =0;
  reste_a_payerTT:number =0;
  achats?: any;

  ca: number = 0;
  nombreTotalLivraisons : number = 0;
  valeurStock: number = 0;
  totalDepense: number = 0;

  totalAchat: number = 0;

  public currentPage:number = 0;
  public size:number=10;
  public totalPages:number = 0;
  public pages?: Array<number>;

  connectedUser: any;
  dateVente: Date = new Date();
  vendeurSelected: any;
  subs: Observable<any> =  new Observable<any>();
  clients: Client[] = [];

  stocksInsuffisant: any;
  listeProduitsStock: any;
  allStock: any = [];
  livraisons: any = [];
  nombreTotalClients: number = 0;

  constructor(private livraisonService: LivraisonService,
              private router: Router,
              private achatService:AchatService, private communService:CommunService, 
              private authService: AuthService,
              private clientService: ClientService,
              private depenseService: DepenseService) { }


  ngOnInit(): void {
    this.connectedUser = this.authService.getConnectedUserData();
    this.initBaseURL();
    this.getCATotal();
    this.getNombreTotalLivraisons();
    this.getNombreClients();
    this.getTotalDepentes();
    this.getTotalAchat();
    this.subs = this.livraisonService.getAllLivraisons(this.currentPage, this.size);
    this.onGetAllVentes();
    // this.onGetAllAchats();
  }
  getTotalAchat() {
    this.achatService.getTotalAchat().subscribe(tAchat  => {
      this.totalAchat = tAchat;
    })
  }
  getTotalDepentes() {
    this.depenseService.getTotalDepense().subscribe(tDepense  => {
      this.totalDepense = tDepense;
    })
  }
  getNombreClients(){
    this.clientService.getNombreClient().subscribe(nbrtotal  => {
      this.nombreTotalClients = Number(nbrtotal);
    })
  }
  getNombreTotalLivraisons() {
    this.livraisonService.getNombreLivraison().subscribe(nbrtotal  => {
      this.nombreTotalLivraisons = nbrtotal;
    })
  }
  getCATotal() {
    this.livraisonService.getTotalCA().subscribe(catotal  => {
      this.ca = catotal;
    })
  }

  initBaseURL(){ 
    if(this.connectedUser.profile == 'VENDEUR'){
      this.baseUrl = environment.vendeurUrl;
    }else{
      this.baseUrl = environment.adminUrl;
    }
  }

  onGetAllVentes(){
    this.montant_dueTT = 0;
    this.subs.subscribe(data => {
      //console.log(data);
      let lvrsons = data._embedded.livraisons;
      this.livraisons = [];
      for(let liv of lvrsons){
        this.montant_dueTT += Number(liv.fraisLivraison);
        let urlClient = liv._links.client.href;        
        this.communService.getItem(urlClient).subscribe(data => {
          let cl = new Client();
          cl = data;
          cl.idClient = Number(this.communService.getObjectId(data._links.self.href));
          liv.client = cl;
          // console.log(liv);
        });

        let urlLivreur = liv._links.livreur.href;        
        this.communService.getItem(urlLivreur).subscribe(data => {
          let livreur = new Livreur();
          livreur = data;
          livreur.idLivreur = Number(this.communService.getObjectId(data._links.self.href));
          liv.livreur = livreur;
        });

        let urlCompagnie = liv._links.compagniePartenaire.href;        
        this.communService.getItem(urlCompagnie).subscribe(data => {
          let compagniePartenaire = new CompagniePartenaire();
          compagniePartenaire = data;
          compagniePartenaire.idCompagnie = Number(this.communService.getObjectId(data._links.self.href));
          liv.compagniePartenaire = compagniePartenaire;
          // console.log(liv);
        });

        let urlColis = liv._links.colis.href;        
        this.communService.getItem(urlColis).subscribe(data => {
          let colis = new Colis();
          colis = data._embedded.colis;
          // colis.idColis = Number(this.communService.getObjectId(data._links.self.href));
          liv.colis = colis;
          // console.log(liv);
        });

        this.livraisons.push(liv);
      }
      // console.log(this.livraisons);
    });
  }



  // onGetStocksInsufisant(){
  //   this.stockService.getStocksInsufisant().subscribe(data=>{
  //     console.log("++++++data++++++");
  //     console.log(data);
  //   })
  // }


  onViewVente(u: any) {   
    let url = u._links.self.href;
    this.redirection("list-ventes/"+btoa(url));
  }

  redirection(route: string) {
    this.router.navigateByUrl(this.baseUrl+"/" + route);
  }

}
