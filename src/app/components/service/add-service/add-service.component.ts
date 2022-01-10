import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  serviceFormGroup = new FormGroup({
    libelle: new FormControl(''),
    description: new FormControl('')
  });

  submitted:boolean = false;
  
  baseUrl =  environment.adminUrl;


  constructor(private serviceService: ServiceService, 
    private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit(): void {
    this.serviceFormGroup = this.fb.group({
      libelle:["",Validators.required],
      description:["",Validators.required],
    });  
  }

  onSaveService(){
    this.submitted = true;
    if (this.serviceFormGroup?.invalid) return;
    
    this.serviceService.saveService(this.serviceFormGroup?.value).subscribe(data => {
      alert("Un service ajouté avec succès");
      this.redirection("services");
    });

    
  }

  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }

}
