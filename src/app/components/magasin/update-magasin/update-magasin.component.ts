import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Magasin } from 'src/app/models/magasin.model';
import { CommunService } from 'src/app/services/commun.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-magasin',
  templateUrl: './update-magasin.component.html',
  styleUrls: ['./update-magasin.component.css']
})
export class UpdateMagasinComponent implements OnInit {

  public currentMagasin?: Magasin;
  id: number = 0;

  baseUrl =  environment.adminUrl;

  magasinFormGroup = new FormGroup({
     liebelle: new FormControl(''),
    adresse: new FormControl(''),
    dimension: new FormControl('')
  });

  submitted:boolean = false;


  constructor(private router: Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute,
    private magasinServices:MagasinService, private communService:CommunService) { }

  ngOnInit(): void {

    let url = atob(this.activatedRoute.snapshot.params.url);
    this.id = this.communService.getObjectId(url);
    this.magasinServices.getMagasin(this.id)
    .subscribe(data=>{
      
      
      this.currentMagasin = data;
      console.log(this.currentMagasin);
      this.initForm();
      
    },err=>{

    })
  }


  initForm() {
    if (this.currentMagasin) {
      this.magasinFormGroup = this.fb.group({
        libelle:[this.currentMagasin.libelle,Validators.required],
        adresse:[this.currentMagasin.adresse,Validators.required],
        dimension:[this.currentMagasin.dimension,Validators.required]
      })
    }
  }

  onUpdateMagasin() {
    
    console.log(this.magasinFormGroup?.value);
     
    this.magasinServices.updateMagasins(this.id, this.magasinFormGroup?.value)
      .subscribe(data => {
       alert("Mise à jour effectuée avec Succès");
      this.router.navigateByUrl(this.baseUrl+"/magasins");
    },err=>{

    })

  }

  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }

}
