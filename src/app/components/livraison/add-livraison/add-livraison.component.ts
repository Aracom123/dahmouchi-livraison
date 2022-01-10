import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { Colis } from 'src/app/models/colis.model';
import { CompagniePartenaire } from 'src/app/models/compagnie.model';
import { Livraison } from 'src/app/models/livraison.model';
import { Livreur } from 'src/app/models/livreur.model';
import { MaterielRoulant } from 'src/app/models/mat-roulant.model';
import { ClientService } from 'src/app/services/client.service';
import { ColisService } from 'src/app/services/colis.service';
import { CommunService } from 'src/app/services/commun.service';
import { CompagnieService } from 'src/app/services/compagnie.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import { LivreurService } from 'src/app/services/livreur.service';
import { environment } from 'src/environments/environment';
import { CompagnieComponent } from '../../compagnie/compagnie.component';

@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.css']
})
export class AddLivraisonComponent implements OnInit {

  /**
   * @var achats pour stocker tous les achats
   * @var lAchats  pour stocker la liste des achat pour un achat precis
   * @var lAchatColis pour stocker la liste des produits concernant une liste d'achat precise
   * @var achat pour stocker un achat precis
   * @var nomColiss pour stocker la liate des poduits à des index précis
   */

  client = new Client();
  compagnie = new CompagniePartenaire();
  closeModal?: string;
  baseUrl =  environment.adminUrl;

  submitted:boolean = false;
  itemToActivate: number= 1;

  public currentPage:number = 0;
  public size:number=50;
  public totalPages:number = 0;
  public pages?: Array<number>;
 
 
 
  /**
  * @var le formulaire à soumettre pour ajouter la reception et la liste_produits_reception
  */
  livraisonFormGroup = new FormGroup({
    dateLivraison: new FormControl(''),
    fraisLivraison : new FormControl(''),
    adresseLivraison : new FormControl(''),
    livreur: new FormControl(''),
    colis: new FormArray([]),
    compagnie: new FormControl(''),
    email: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    type: new FormControl(''),
    ninia: new FormControl(''),
    rccm: new FormControl(''),
   });
 
  @ViewChildren("checkboxes") checkboxes?: QueryList<ElementRef>;

  compagniePartenaires: any;
  listeColisLivraison: any;
  livreurs: any;
  typeClient: boolean = false;
  numeroClient: any;
 
   /**
    * Notre constructeur
    * @param achatServices les service du modele Achat et ListeColissAchat
    * @param router 
    * @param activatedRoute 
    * @param http 
    * @param formBuilder 
    */
   constructor(private livraisonService: LivraisonService, private colisService: ColisService, private livreurService: LivreurService, private clientService: ClientService, private compagnieService: CompagnieService,
     private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private modalService: NgbModal,private communService: CommunService, private router: Router) {
 
   }

  ngOnInit(): void {
    this.onGetAllLivreurs();
    this.onGetAllCompagniePartenaires();
    this.initForm();  
  }

  onGetAllLivreurs(){
    this.livreurService.getAllLivreurs(this.currentPage, this.size).subscribe(data => {
      console.log(data);
      this.livreurs = data._embedded.livreurs;
    })
  }

  onGetAllCompagniePartenaires(){
    this.compagnieService.getAllCompagniePartenaires(this.currentPage, this.size).subscribe(data => {
      // console.log(data);
      this.compagniePartenaires = data._embedded.compagniePartenaires;
    })
  }

   /**
  * used for making modals
  * @param content 
  */
     triggerModal(content: any, item: any) {
       if (item != null) {
         //this.onViewReglement(item);
       }
       this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
         this.closeModal = `Closed with: ${res}`;
       }, (res) => {
         this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
       });
     }
 
      /**
  * used for making modals
  * @param content 
  */
   triggerModalReception(content: any, item: any) {
     if (item != null) {
      //  this.onViewReglement(item);
     }
     this.modalService.open(content, { size: 'lg', windowClass: 'modal-xl', ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
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

  /**
   * init livraison Form
   */
  initForm() {
    this.livraisonFormGroup = this.formBuilder.group({
      dateLivraison:[new Date(), Validators.required],
      fraisLivraison:[0,Validators.required],
      adresseLivraison:[''],
      livreur:['',Validators.required],
      compagniePartenaire:['', Validators.required],
      colis: new FormArray([]),
      email:[""],
      nom:["",Validators.required],
      prenom:[""],
      numero:["",Validators.required],
      type:["PERSONNE PHYSIQUE"],
      ninia:[""],
      rccm:[""],
    });
    this.lColisLivraison().push(this.newLColisLivraison());
  }  
  
  onGetCompagnie() { 
    this.compagnieService.getAllCompagniePartenaires(0, 25).subscribe(data=>{
      this.compagniePartenaires = data._embedded.compagniePartenaires;
    //  console.log(this.compagniePartenaires); 
    });
  } 

  onChangeTypeClient(event: any){
    let tClient = event.target.value;
    if(tClient == "ENTREPRISE") this.typeClient = true;
    else this.typeClient = false;
  }

  /**
 * new lProduitsvente
 */
   newLColisLivraison(): FormGroup {
    return this.formBuilder.group({
      codeColis: ['', Validators.required],
      nature: ['', Validators.required],
      valeurColis: [1],
      quantite:[1],
      description: ['']
    });
  }


  get quantity() {
    return ((this.livraisonFormGroup.get('lColisLivraison') as FormGroup) as FormGroup).get('quantite');
  }
  
  /**
   * @param Produit
   * add a product in a liste produits vente
   */
  addlColisLivraison(c:Colis) {
    this.lColisLivraison().push(this.newLColisLivraison());
    //this.lColisLivraison().push(this.newLColisLivraison(p));
    //this.isExist(p.codeProduit, this.lColisLivraison());
    this.listeColisLivraison = this.livraisonFormGroup.value.lColisLivraison;
  }

  /**
   * Ajouter une ligne dans la liste de colis
   */
  addColis(){
    this.lColisLivraison().push(this.newLColisLivraison());
    // console.log(this.lColisLivraison());
    // this.listeStocks.push(this.newProduit().value);
  }

  
  /**
   * Supprimer une loigne de la liste de colis
   * @param i 
   */
  removeColis(empIndex: any){
    this.lColisLivraison().removeAt(empIndex);
  }

  /**
   *  verifier l'existance d'un item 
   */
  isExist(codeProduit:any){
    let ind:any=null;
    this.lColisLivraison().controls.forEach((element, index) => {
      //console.log(element);
      if(codeProduit === this.lColisLivraison().getRawValue()[index].codeProduit){
        ind = index;
      }
    });
    return ind;
  }

  /**
   * 
   * @returns a formArray
   */
  lColisLivraison():FormArray{
    return this.livraisonFormGroup?.get('colis') as FormArray;
  }

  setItemToActivate(itemNumber: number){
    this.itemToActivate = itemNumber;
  }

  onChangeNumero(event: any){
    this.numeroClient = Number(event.target.value);
    this.clientService.isClientExist(this.numeroClient).subscribe(respCount => {
      if(respCount > 0){
        this.clientService.getClientByNumero(this.numeroClient).subscribe(resp => {
          this.livraisonFormGroup.get("nom")?.setValue(resp.nom);
          this.livraisonFormGroup.get("prenom")?.setValue(resp.prenom);
          this.livraisonFormGroup.get("email")?.setValue(resp.email);
          this.livraisonFormGroup.get("type")?.setValue(resp.type);
          this.livraisonFormGroup.get("rccm")?.setValue(resp.rccm);
          this.livraisonFormGroup.get("ninia")?.setValue(resp.ninia);
        });
      }
    });  
  }
  onBlur(event: any){
    this.onChangeNumero(event);    
  }

  onKeyup(event: any){
    let numSaisi = Number(event.target.value);
    if(this.numeroClient != null && this.numeroClient != numSaisi){
      this.numeroClient == null;
      this.livraisonFormGroup.get("nom")?.setValue('');
      this.livraisonFormGroup.get("prenom")?.setValue('');
      this.livraisonFormGroup.get("email")?.setValue('');
      this.livraisonFormGroup.get("type")?.setValue('');
      this.livraisonFormGroup.get("rccm")?.setValue('');
      this.livraisonFormGroup.get("ninia")?.setValue('');
    }
  }

  onAddLivraison(){
    if(!this.livraisonFormGroup.invalid){
      let livraison = this.livraisonFormGroup.value;
      
      //On recupere le compagnie
      let compagniePartenaire = new CompagniePartenaire();
      compagniePartenaire = livraison.compagniePartenaire;
      let idCom = this.communService.getObjectId(livraison.compagniePartenaire._links.self.href);
      compagniePartenaire.idCompagnie = idCom;

      livraison.compagniePartenaire = compagniePartenaire;

      //On recupere la livreur
      let livreur = new Livreur();
      livreur = livraison.livreur;
      let idLivreur = this.communService.getObjectId(livraison.livreur._links.self.href);
      livreur.idLivreur = idLivreur;

      livraison.livreur = livreur;

      //On recupere les informations du livreur      
      let nom = livraison.nom;
      let prenom = livraison.prenom;
      let email = livraison.email;
      let numero = livraison.numero;
      let type = livraison.type;
      let rccm = livraison.rccm;
      let ninia = livraison.ninia;
      //On crée un nouveau livreur et rensiegne ses informations 
      let client = new Client();
      client.numero = numero;
      client.email = email;
      client.nom =   nom;
      client.prenom =   prenom;
      client.type =   type;
      client.rccm =   rccm;
      client.ninia =   ninia;
      this.clientService.isClientExist(numero).subscribe(respCount => {
        let obs = new Observable<any>();
        //On vérifie si le client n'a pas été déjà enregistré
        if(respCount > 0){
          this.clientService.getClientByNumero(numero).subscribe(resp => {
            let idCl = this.communService.getObjectId(resp._links.self.href);
            client.idClient = idCl;
            this.clientService.updateClients(idCl, client).subscribe(clData => {
              let clUrl = clData._links.self.href;
              let idClient = this.communService.getObjectId(clUrl);
              client.idClient = idClient;
              livraison.client = client;
              this.livraisonService.saveLivraison(livraison).subscribe(livraisonData => {
                let livraisonSaved = new Livraison();
                let idLivraisonSaved = this.communService.getObjectId(livraisonData._links.self.href);
                livraisonSaved = livraisonData;
                livraisonSaved.idLivraison = idLivraisonSaved;
                let listColis = livraison.colis;
                for(let colis of listColis){
                  let c = new Colis();
                  c = colis;
                  c.livraison = livraisonSaved;
                                
                  this.colisService.saveColis(c).subscribe(colisData =>{
                    
                  });
                }
                alert("Livraison ajoutée avec succès !");
                this.redirection("list-livraison/"+ btoa(livraisonData._links.self.href));
              });
            });            
          });
        }
        else{
          this.clientService.saveClient(client).subscribe(clData => {
            let clUrl = clData._links.self.href;
            let idClient = this.communService.getObjectId(clUrl);
            client.idClient = idClient;  
            livraison.client = client;
            this.livraisonService.saveLivraison(livraison).subscribe(livraisonData => {
                let livraisonSaved = new Livraison();
                let idLivraisonSaved = this.communService.getObjectId(livraisonData._links.self.href);
                livraisonSaved = livraisonData;
                livraisonSaved.idLivraison = idLivraisonSaved;
                let listColis = livraison.colis;
                for(let colis of listColis){
                  let c = new Colis();
                  c = colis;
                  c.livraison = livraisonSaved;
                                
                  this.colisService.saveColis(c).subscribe(colisData =>{
                    
                  });
                }
                alert("Livraison ajoutée avec succès !");
                this.redirection("list-livraison/"+ btoa(livraisonData._links.self.href));
            });
          });
        }
      });      
    }
    else{
      alert("Veuillez remplir correctement le formulaire");
    }
  }
  
  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }
}
