import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';
import { DepenseService } from 'src/app/services/depense.service';
import { ServiceService } from 'src/app/services/service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.css']
})
export class AddDepenseComponent implements OnInit {

  depenseFormGroup = new FormGroup({
    montant: new FormControl(''),
    reference: new FormControl(''),
    date: new FormControl(''),
     service: new FormControl(''),
  });

  submitted:boolean = false;

  services?: any;
  baseUrl =  environment.adminUrl;
 

  constructor(private depenseService:DepenseService, private communService: CommunService, private serviceService: ServiceService, private fb:FormBuilder , private router:Router) {
    
  }

  ngOnInit(): void {
    this.depenseFormGroup = this.fb.group({
      montant:["",Validators.required],
      reference:["",Validators.required],
      date:["",Validators.required],
      service:["",Validators.required],
    });

    this.onGetAllServices();

  }

  get f(){return this.depenseFormGroup.controls}

  MustMutch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const macthingControl = formGroup.controls[matchingControlName];
      if (macthingControl.errors && !macthingControl.errors.MustMutch) {
        return
      }
      if (control.value !== macthingControl.value) {
        macthingControl.setErrors({ MustMutch: true});
      }
      else {
        macthingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.depenseFormGroup.invalid) {
      return;
    }
  }


  onGetAllServices() {
    this.serviceService.getAllServices()
      .subscribe(response => {
      this.services = response._embedded.services;
      let index = 0;
      for(let service of this.services){
        let idPro = this.communService.getObjectId(service._links.self.href);
        this.services[index].idService = idPro;
        index++;
      }
       
    });
  }

  onSaveDepense() {
    this.onSubmit();
    this.submitted = true;
    if (this.depenseFormGroup?.invalid) return;
    console.log(this.depenseFormGroup?.value);
    this.depenseService.saveDepense(this.depenseFormGroup?.value).subscribe(data => {
      alert("Depense ajouté avec succès");
      this.redirection("depenses");
    });

    
  }

  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }


}
