import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {

  baseUrl =  environment.adminUrl;

  clientFormGroup = new FormGroup({
    email: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    type: new FormControl(''),
    ninia: new FormControl(''),
    rccm: new FormControl(''),
  });

  submitted:boolean = false;


  constructor(private clientService: ClientService, private profileService: ProfileService,
    private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit(): void {
    this.clientFormGroup = this.fb.group({
      email:[""],
      nom:["",Validators.required],
      prenom:[""],
      numero:["",Validators.required],
      type:["",Validators.required],
      ninia:[""],
      rccm:[""],
    });  
  }


  onSaveClient(){
    this.submitted = true;
    if (this.clientFormGroup?.invalid) return;    
    this.clientService.saveClient(this.clientFormGroup?.value).subscribe(data => {
      alert("Utilisateur ajouté avec succès");
      this.redirection("clients");
    });
  }

  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }
}
