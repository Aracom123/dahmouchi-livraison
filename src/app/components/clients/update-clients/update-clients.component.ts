import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { CommunService } from 'src/app/services/commun.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-clients',
  templateUrl: './update-clients.component.html',
  styleUrls: ['./update-clients.component.css']
})
export class UpdateClientsComponent implements OnInit {


  public currentClient?: Client;

  baseUrl =  environment.adminUrl;

  clientFormGroup = new FormGroup({
    email: new FormControl(''),
    login: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl(''),
    ninia: new FormControl(''),
    rccm: new FormControl(''),
    statut: new FormControl('')
  });

  //clientId: number;
  submitted:boolean = false;
  
  id: number = 0;

  constructor(private router: Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute,
    private clientService: ClientService, private communService: CommunService, private http: HttpClient) {
      //this.clientId = this.activatedRoute.snapshot.params.id;
     }

    ngOnInit(): void {

      let url = atob(this.activatedRoute.snapshot.params.url);
      this.id = this.communService.getObjectId(url);
    this.clientService.getClients(this.id)
    .subscribe(data=>{
      
      this.currentClient = data;
      //console.log(this.currentClient);
      this.initForm();
      
    },err=>{

    })
      
    }
  

    initForm() {
      if (this.currentClient) {
        this.clientFormGroup = this.fb.group({
          email:[this.currentClient.email,Validators.required],
          login:[this.currentClient.login,Validators.required],
          nom:[this.currentClient.nom,Validators.required],
          prenom:[this.currentClient.prenom,Validators.required],
          numero:[this.currentClient.numero,Validators.required],
          type:[this.currentClient.type,Validators.required],
          ninia: [this.currentClient.ninia, Validators.required],
          rccm:[this.currentClient.rccm,Validators.required],
          statut:[this.currentClient.statut,Validators.required],
          password:[this.currentClient.password,Validators.required]
        })
      }
    }
  
    
onUpdateUser() {
  console.log(this.clientFormGroup.value);
  this.currentClient = this.clientFormGroup.value;
  //console.log("current client => "+this.clientFormGroup.value);
  this.clientService.updateClients(this.id, this.clientFormGroup.value)
    .subscribe(data => {
      alert("Mise à jour effectuée avec Succès");
    this.router.navigateByUrl(this.baseUrl+"/clients");
  },err=>{

  })

}
  
    redirection(route:string){
      this.router.navigateByUrl(this.baseUrl+"/"+route);
    }

}
