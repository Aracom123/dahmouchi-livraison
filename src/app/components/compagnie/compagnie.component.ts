import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompagniePartenaire } from 'src/app/models/compagnie.model';
import { MaterielRoulant } from 'src/app/models/mat-roulant.model';
import { CommunService } from 'src/app/services/commun.service';
import { CompagnieService } from 'src/app/services/compagnie.service';

@Component({
  selector: 'app-compagnie',
  templateUrl: './compagnie.component.html',
  styleUrls: ['./compagnie.component.css']
})
export class CompagnieComponent implements OnInit {

  closeModal?: string;

  compagniePartenaires: any = [];
  idCompagniePartenaire: any;

  submitted: boolean = false;

  currentPage : number = 0;
  size : number = 50;

  compagniePartenaireFormGroup = new FormGroup({
    email: new FormControl(''),
    libelle: new FormControl(''),
    numero: new FormControl(''),
    rccm: new FormControl(''),
    ninia: new FormControl(''),
    adresse: new FormControl('')
  });

  formUpdateCompagniePartenaire = new FormGroup({
    email: new FormControl(''),
    libelle: new FormControl(''),
    numero: new FormControl(''),
    rccm: new FormControl(''),
    ninia: new FormControl(''),
    adresse: new FormControl('')
  });

  compagniePartenaireToUpdate: any;

  constructor(private compagnieService: CompagnieService, 
              private communService: CommunService,
              private fb: FormBuilder, 
              private router: Router, 
              private modalService:NgbModal) { }


  ngOnInit(): void {
    this.initCompagniePartenaireForm();
    this.onGetAllCompagniePartenaires();
  }

  onGetAllCompagniePartenaires(){
    this.compagnieService.getAllCompagniePartenaires(this.currentPage, this.size).subscribe(data => {
      // console.log(data);
      this.compagniePartenaires = data._embedded.compagniePartenaires;
    })
  }

  initCompagniePartenaireForm(){
    this.compagniePartenaireFormGroup = this.fb.group({
      email:[""],
      libelle:["",Validators.required],
      numero:["",Validators.required],
      ninia:[""],
      rccm:[""],
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
        this.onViewCompagniePartenaire(item);
      }
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

    onViewCompagniePartenaire(u: any) {
      this.idCompagniePartenaire = this.communService.getObjectId(u._links.self.href);
      this.communService.getItem(u._links.self.href).subscribe(data => {
        let compagnie = data;
        this.initUpdateForm(compagnie);
      });
    }

    onSaveCompagniePartenaire(){      
      if(!this.compagniePartenaireFormGroup.invalid){
        let compagnie = new CompagniePartenaire();
        compagnie = this.compagniePartenaireFormGroup.value;
        //let idMR = this.communService.getObjectId(compagnie.materielRoulant?._links.self.href);
        this.compagnieService.saveCompagniePartenaire(compagnie).subscribe(data => {
          this.onGetAllCompagniePartenaires();
          alert("Compagnie partenaire ajouté avec succès ");
        });
      }
      else{
        alert("Veuillez renseigner correcment le formulaire !!!");
      }
    }

    onUpdateCompagniePartenaire(){
      if(!this.formUpdateCompagniePartenaire.invalid){
        let compagnie = new CompagniePartenaire();
        compagnie = this.formUpdateCompagniePartenaire.value;
        compagnie.idCompagnie = this.idCompagniePartenaire;
        console.log(this.formUpdateCompagniePartenaire.value);
        console.log(this.idCompagniePartenaire);
        alert("CompagniePartenaire mis à jour avec succès ");
        this.compagnieService.updateCompagniePartenaires(this.idCompagniePartenaire, compagnie).subscribe(data => {
          this.onGetAllCompagniePartenaires();
        });
      }
      else{
        alert("Veuillez renseigner correcment le formulaire !!!");
      }
    }

    initUpdateForm(compagnie: any) {
      this.compagniePartenaireToUpdate = compagnie;
      // console.log(this.compagniePartenaireToUpdate);
      this.formUpdateCompagniePartenaire = this.fb.group({
        email:[this.compagniePartenaireToUpdate.email],
        libelle:[this.compagniePartenaireToUpdate.libelle,Validators.required],
        rccm:[this.compagniePartenaireToUpdate.rccm,Validators.required],
        numero:[this.compagniePartenaireToUpdate.numero,Validators.required],
        ninia:[this.compagniePartenaireToUpdate.ninia,],
        adresse:[this.compagniePartenaireToUpdate.adresse]
      });
    }

    onDeleteCompagniePartenaire(compagnie: any){
      let url = compagnie._links.self.href;
      let id = this.communService.getObjectId(url);
      
      let res = confirm("Vous voulez vraiment supprimer ? ");
      if(res == true)
        this.compagnieService.deleteCompagniePartenaire(id).subscribe(data=>{
        this.onGetAllCompagniePartenaires();
      })
    }

}
