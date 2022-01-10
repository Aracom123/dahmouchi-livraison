import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterielRoulant } from 'src/app/models/mat-roulant.model';
import { CommunService } from 'src/app/services/commun.service';
import { MatRoulantService } from 'src/app/services/mat-roulant.service';

@Component({
  selector: 'app-mat-roulant',
  templateUrl: './mat-roulant.component.html',
  styleUrls: ['./mat-roulant.component.css']
})
export class MatRoulantComponent implements OnInit {
  closeModal?: string;

  listMatRoulants: any;
  idMR: any;

  currentPage : number = 0;
  size : number = 50;

  mrFormGroup = new FormGroup({
    matricule: new FormControl(''),
    libelle: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    etat: new FormControl('')
  });

  formUpdateMR = new FormGroup({
    matricule: new FormControl(''),
    libelle: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    etat: new FormControl('')
  });
  mrToUpdate: any;

  constructor(private mrService: MatRoulantService, 
              private communService: CommunService,
              private fb: FormBuilder, 
              private router: Router, 
              private modalService:NgbModal) { }


  ngOnInit(): void {
    this.initMRForm();
    this.onGetAllMateriels();
  }

  onGetAllMateriels(){
    this.mrService.getAllMatRoulants(this.currentPage, this.size).subscribe(data => {
      // console.log(data);
      this.listMatRoulants = data._embedded.materielRoulants;
    })
  }

  initMRForm(){
    this.mrFormGroup = this.fb.group({
      matricule:["", Validators.required],
      libelle:[""],
      description:[""],
      type:["",Validators.required],
      etat:[""]
    });
  }

   /**
   * used for making modals
   * @param content 
   */
    triggerModal(content: any, item: any) {
      if (item != null) {
        // console.log(item);
        this.onViewMR(item);
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
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

    onViewMR(u: any) {
      this.idMR = this.communService.getObjectId(u._links.self.href);
      this.communService.getItem(u._links.self.href).subscribe(data => {
        let mr = data;
        this.initUpdateForm(mr);
      });
    }

    onSaveMatRoulant(){
      let mr = new MaterielRoulant();
      mr = this.mrFormGroup.value;

      if(!this.mrFormGroup.invalid)
      {
        this.mrService.saveMaterielsRoulant(mr).subscribe(data => {
          this.onGetAllMateriels();
          alert("Matériel roulant ajouté avec succès ");
        });
      }
      else{
        alert("Veuillez renseigner correcment le formulaire !!!");
      }
    }

    onUpdateMatRoulant(){
      let mr = new MaterielRoulant();
      mr = this.formUpdateMR.value;
      alert("Matériel roulant mis à jour avec succès ");
      this.mrService.updateMaterielsRoulant(this.idMR, mr).subscribe(data => {
        this.onGetAllMateriels();
      });
    }

    initUpdateForm(mr: any) {
      this.mrToUpdate = mr;
      // console.log(this.mrToUpdate);
      this.formUpdateMR = this.fb.group({
        matricule:[this.mrToUpdate.libelle, Validators.required],
        libelle:[this.mrToUpdate.matricule],
        description:[this.mrToUpdate.description],
        type:[this.mrToUpdate.type,Validators.required],
        etat:[this.mrToUpdate.etat]
      });
    }

    onDeleteMR(mr: any){
      let url = mr._links.self.href;
      let id = this.communService.getObjectId(url);
      
      let res = confirm("Vous voulez vraiment supprimer ? ");
      if(res == true)
        this.mrService.deleteMaterielRoulant(id).subscribe(data=>{
        this.onGetAllMateriels();
      })
    }
}
