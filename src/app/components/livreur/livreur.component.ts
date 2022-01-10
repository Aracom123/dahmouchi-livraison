import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Livreur } from 'src/app/models/livreur.model';
import { MaterielRoulant } from 'src/app/models/mat-roulant.model';
import { CommunService } from 'src/app/services/commun.service';
import { LivreurService } from 'src/app/services/livreur.service';
import { MatRoulantService } from 'src/app/services/mat-roulant.service';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {

  closeModal?: string;

  livreurs: any = [];
  idLivreur: any;

  submitted: boolean = false;

  currentPage : number = 0;
  size : number = 50;

  livreurFormGroup = new FormGroup({
    email: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    materielRoulant: new FormControl(''),
    adresse: new FormControl('')
  });

  formUpdateLivreur = new FormGroup({
    email: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    materielRoulant: new FormControl(''),
    adresse: new FormControl('')
  });
  livreurToUpdate: any;
  listMatRoulants: any = [];

  constructor(private livreurService: LivreurService, 
              private communService: CommunService,
              private mrService: MatRoulantService,
              private fb: FormBuilder, 
              private router: Router, 
              private modalService:NgbModal) { }


  ngOnInit(): void {
    this.initLivreurForm();
    this.onGetAllLivreurs();
    this.onGetAllMatRoulant();
  }

  onGetAllLivreurs(){
    this.livreurService.getAllLivreurs(this.currentPage, this.size).subscribe(data => {
      console.log(data);
      let lvreurs = data._embedded.livreurs;
      this.livreurs = [];
      for(let liv of lvreurs){
        let urlMatR = liv._links.materielRoulant.href;        
        this.communService.getItem(urlMatR).subscribe(data => {
          let mr = new MaterielRoulant();
          mr = data;
          mr.idMaterielRoulant = Number(this.communService.getObjectId(data._links.self.href));
          liv.materielRoulant = mr;
          // console.log(liv);
          this.livreurs.push(liv);
        })
      }
    })
  }

  initLivreurForm(){
    this.livreurFormGroup = this.fb.group({
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
        this.onViewLivreur(item);
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
      this.mrService.getAllMatRoulants(this.currentPage, this.size).subscribe(data => {
        // console.log(data);
        let lmr = data._embedded.materielRoulants;
        for(let mr of lmr){
          let mrModel = new MaterielRoulant();
          mrModel = mr;
          let idMr = this.communService.getObjectId(mr._links.self.href);
          mrModel.idMaterielRoulant = idMr;
          this.listMatRoulants.push(mrModel);
        }
      })
    }

    onViewLivreur(u: any) {
      this.idLivreur = this.communService.getObjectId(u._links.self.href);
      this.communService.getItem(u._links.self.href).subscribe(data => {
        let livreur = data;
        this.initUpdateForm(livreur);
      });
    }

    onSaveLivreur(){
      
      if(!this.livreurFormGroup.invalid){
        let livreur = new Livreur();
        livreur = this.livreurFormGroup.value;
        //let idMR = this.communService.getObjectId(livreur.materielRoulant?._links.self.href);
        this.livreurService.saveLivreur(livreur).subscribe(data => {
          this.onGetAllLivreurs();
          alert("Livreur ajouté avec succès ");
        });
      }
      else{
        alert("Veuillez renseigner correcment le formulaire !!!");
      }
    }

    onUpdateLivreur(){
      if(!this.formUpdateLivreur.invalid){
        let livreur = new Livreur();
        livreur = this.formUpdateLivreur.value;
        livreur.idLivreur = this.idLivreur;
        console.log(this.formUpdateLivreur.value);
        console.log(this.idLivreur);
        alert("Livreur mis à jour avec succès ");
        this.livreurService.updateLivreurs(this.idLivreur, livreur).subscribe(data => {
          this.onGetAllLivreurs();
        });
      }
      else{
        alert("Veuillez renseigner correcment le formulaire !!!");
      }
    }

    initUpdateForm(livreur: any) {
      this.livreurToUpdate = livreur;
      // console.log(this.livreurToUpdate);
      this.formUpdateLivreur = this.fb.group({
        email:[this.livreurToUpdate.email],
        nom:[this.livreurToUpdate.nom,Validators.required],
        prenom:[this.livreurToUpdate.prenom,Validators.required],
        numero:[this.livreurToUpdate.numero,Validators.required],
        materielRoulant:[this.livreurToUpdate.materielRoulant,],
        adresse:[this.livreurToUpdate.adresse]
      });
    }

    onDeleteLivreur(livreur: any){
      let url = livreur._links.self.href;
      let id = this.communService.getObjectId(url);
      
      let res = confirm("Vous voulez vraiment supprimer ? ");
      if(res == true)
        this.livreurService.deleteLivreur(id).subscribe(data=>{
        this.onGetAllLivreurs();
      })
    }

}
