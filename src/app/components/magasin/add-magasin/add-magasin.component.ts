import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagasinService } from 'src/app/services/magasin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-magasin',
  templateUrl: './add-magasin.component.html',
  styleUrls: ['./add-magasin.component.css']
})
export class AddMagasinComponent implements OnInit {

  magasinFormGroup = new FormGroup({
    libelle: new FormControl(''),
    adresse: new FormControl(''),
    dimension: new FormControl('')
  });

  submitted:boolean = false;
  
  baseUrl =  environment.adminUrl;


  constructor(private magasinService: MagasinService, 
    private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit(): void {
    this.magasinFormGroup = this.fb.group({
      libelle:["",Validators.required],
      adresse:["",Validators.required],
      dimension:["",Validators.required],
    });

  
  }

  onSaveMagasin(){
    this.submitted = true;
    if (this.magasinFormGroup?.invalid) return;
    
    this.magasinService.saveMagasin(this.magasinFormGroup?.value).subscribe(data => {
      alert("Un magasin ajouté avec succès");
      this.redirection("magasins");
    });

    
  }

  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }

}
