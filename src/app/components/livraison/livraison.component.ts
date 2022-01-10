import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { observable, Observable } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { Colis } from 'src/app/models/colis.model';
import { CompagniePartenaire } from 'src/app/models/compagnie.model';
import { Livraison } from 'src/app/models/livraison.model';
import { Livreur } from 'src/app/models/livreur.model';
import { ClientService } from 'src/app/services/client.service';
import { CommunService } from 'src/app/services/commun.service';
import { CompagnieService } from 'src/app/services/compagnie.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import { LivreurService } from 'src/app/services/livreur.service';
import { MatRoulantService } from 'src/app/services/mat-roulant.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {

  closeModal?: string;

  livraisons: any = [];
  idLivraison: any;

  submitted: boolean = false;

  currentPage : number = 0;
  size : number = 50;

  livraisonFormGroup = new FormGroup({
    email: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    materielRoulant: new FormControl(''),
    adresse: new FormControl('')
  });

  formUpdateLivraison = new FormGroup({
    email: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    materielRoulant: new FormControl(''),
    adresse: new FormControl('')
  });

  dateLiv: any ; // = new Date().toISOString().slice(0, 10);
  livreurSelected: any;


  livraisonToUpdate: any;
  listMatRoulants: any = [];
  baseUrl: string = environment.adminUrl;

  obs: Observable<any> = new Observable<any>();
  livreurs: any;
  clients: any;
  clientSelected: any;
  montant_dueTT: number = 0;

  constructor(private livraisonService: LivraisonService, 
              private communService: CommunService,
              private mrService: MatRoulantService,
              private livreurService: LivreurService,
              private clientService: ClientService,
              private compagnieService: CompagnieService,
              private fb: FormBuilder, 
              private router: Router, 
              private modalService:NgbModal) { }


  ngOnInit(): void { 
    // if(this.dateLiv == null){
    //   console.log("this.dateLiv");
    //   console.log(this.dateLiv);
    // }
    
    this.onGetAllLivreurs();
    this.onGetAllClients();
    this.obs = this.livraisonService.getAllLivraisons(this.currentPage, this.size);
    this.onGetAllLivraisons(this.obs);
    this.onGetAllMatRoulant();
  }

  onGetAllLivraisons(obs: Observable<any>){
    this.montant_dueTT = 0;
    obs.subscribe(data => {
      let lvrsons = data.content;
      this.livraisons = data.content;
      for(let liv of lvrsons){
        this.montant_dueTT += Number(liv.fraisLivraison)
      //   let urlClient = liv._links.client.href;        
      //   this.communService.getItem(urlClient).subscribe(data => {
      //     let cl = new Client();
      //     cl = data;
      //     cl.idClient = Number(this.communService.getObjectId(data._links.self.href));
      //     liv.client = cl;
      //     // console.log(liv);
      //   });

      //   let urlLivreur = liv._links.livreur.href;        
      //   this.communService.getItem(urlLivreur).subscribe(data => {
      //     let livreur = new Livreur();
      //     livreur = data;
      //     livreur.idLivreur = Number(this.communService.getObjectId(data._links.self.href));
      //     liv.livreur = livreur;
      //   });

      //   let urlCompagnie = liv._links.compagniePartenaire.href;        
      //   this.communService.getItem(urlCompagnie).subscribe(data => {
      //     let compagniePartenaire = new CompagniePartenaire();
      //     compagniePartenaire = data;
      //     compagniePartenaire.idCompagnie = Number(this.communService.getObjectId(data._links.self.href));
      //     liv.compagniePartenaire = compagniePartenaire;
      //     // console.log(liv);
      //   });

      //   let urlColis = liv._links.colis.href;        
      //   this.communService.getItem(urlColis).subscribe(data => {
      //     let colis = new Colis();
      //     colis = data._embedded.colis;
      //     // colis.idColis = Number(this.communService.getObjectId(data._links.self.href));
      //     liv.colis = colis;
      //     // console.log(liv);
      //   });

        // this.livraisons.push(liv);
      }
      // console.log(this.livraisons);
    })
  }  

  onChangeDate(event: any){
    this.dateLiv = event.target.value;
    this.livreurSelected = null;
    if(this.dateLiv != null){
      this.obs = this.livraisonService.getLivraisonsParDate(this.dateLiv, this.currentPage, this.size);
      this.onGetAllLivraisons(this.obs);
    }
    else {
      this.obs = this.livraisonService.getAllLivraisons(this.currentPage, this.size);
      this.onGetAllLivraisons(this.obs);
    }   
  }

  onChangeLivreur(event: any){
    let idLivreur = this.communService.getObjectId(event.target.value);
    this.communService.getItem(event.target.value).subscribe(resp => {
      this.livreurSelected = resp;
      // console.log(this.livreurSelected);
      if(this.dateLiv != null){
        this.obs = this.livraisonService.getLivraisonsParLivreurEtDate(idLivreur, this.dateLiv, this.currentPage, this.size);
        this.onGetAllLivraisons(this.obs);
      }
      else {
        this.obs = this.livraisonService.getLivraisonsParLivreur(idLivreur, this.currentPage, this.size);
        this.onGetAllLivraisons(this.obs);
      }  
    }) 
  }

  onChangeClient(event: any){
    let idClient = this.communService.getObjectId(event.target.value);
    this.communService.getItem(event.target.value).subscribe(resp => {
      this.clientSelected = resp;
      this.obs = this.livraisonService.getLivraisonsParClient(idClient, this.currentPage, this.size);
      this.onGetAllLivraisons(this.obs); 
      this.livreurSelected = null;
      this.dateLiv = null;  
    });
    
  }

  onUpdateLivraison(u: any){
    let urlLivraison = u._links.self.href;
    this.redirection("update-livraison/"+ btoa(urlLivraison));
  }

  initLivraisonForm(){
    this.livraisonFormGroup = this.fb.group({
      email:[""],
      nom:["",Validators.required],
      prenom:["",Validators.required],
      numero:["",Validators.required],
      materielRoulant:["",Validators.required],
      adresse:[""],
    });
  }

   /**
   * used for making modals
   * @param content 
   */
    triggerModal(content: any, item: any) {
      if (item != null) {
        // console.log(item);
        this.onViewLivraison(item);
      }
      // windowClass: 'modal-xl',
      this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
      }, (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      });
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

    onGetAllMatRoulant(){
      // this.mrService.getAllMatRoulants(this.currentPage, this.size).subscribe(data => {
      //   // console.log(data);
      //   let lmr = data._embedded.materielRoulants;
      //   for(let mr of lmr){
      //     let mrModel = new MaterielRoulant();
      //     mrModel = mr;
      //     let idMr = this.communService.getObjectId(mr._links.self.href);
      //     mrModel.idMaterielRoulant = idMr;
      //     this.listMatRoulants.push(mrModel);
      //   }
      // })
    }

    onViewLivraison(u: any) {
      let urlLivraison = u.idLivraison;
      this.redirection("list-livraison/"+  btoa(urlLivraison));
    }

    onSaveLivraison(){
      
      if(!this.livraisonFormGroup.invalid){
        let livraison = new Livraison();
        livraison = this.livraisonFormGroup.value;
        //let idMR = this.communService.getObjectId(livraison.materielRoulant?._links.self.href);
        this.livraisonService.saveLivraison(livraison).subscribe(data => {
          this.onGetAllLivraisons(this.obs);
          alert("Livraison ajouté avec succès ");
        });
      }
      else{
        alert("Veuillez renseigner correcment le formulaire !!!");
      }
    }

    initUpdateForm(livraison: any) {
      this.livraisonToUpdate = livraison;
      // console.log(this.livraisonToUpdate);
      this.formUpdateLivraison = this.fb.group({
        email:[this.livraisonToUpdate.email],
        nom:[this.livraisonToUpdate.nom,Validators.required],
        prenom:[this.livraisonToUpdate.prenom,Validators.required],
        numero:[this.livraisonToUpdate.numero,Validators.required],
        materielRoulant:[this.livraisonToUpdate.materielRoulant,],
        adresse:[this.livraisonToUpdate.adresse]
      });
    }

    onDeleteLivraison(livraison: any){
      let url = livraison._links.self.href;
      let id = this.communService.getObjectId(url);
      
      let res = confirm("Vous voulez vraiment supprimer ? ");
      if(res == true)
        this.livraisonService.deleteLivraison(id).subscribe(data=>{
        this.onGetAllLivraisons(this.obs);
      })
    }

    onGetAllLivreurs(){
      this.livreurService.getAllLivreurs(this.currentPage, this.size).subscribe(data => {
        // console.log(data);
        this.livreurs = data._embedded.livreurs;;
      })
    }

    //get All customer method
    onGetAllClients(){
      
      this.clientService.getAllClients(this.currentPage, this.size)
        .subscribe(response => {
          this.clients = response._embedded.clients;
      });
    }

    
    redirection(route: string) {
      this.router.navigateByUrl(this.baseUrl+"/" + route);
    }
}