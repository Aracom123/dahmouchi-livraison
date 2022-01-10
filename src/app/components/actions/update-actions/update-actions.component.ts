import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'src/app/models/action.model';
import { ActionService } from 'src/app/services/action.service';
import { GroupeActionService } from 'src/app/services/groupe-action.service';

@Component({
  selector: 'app-update-actions',
  templateUrl: './update-actions.component.html',
  styleUrls: ['./update-actions.component.css']
})
export class UpdateActionsComponent implements OnInit {

  public currentAction?: Action;
  public url = '';
  groupes?: any;

  actionFormGroup = new FormGroup({
    libelle: new FormControl(''),
    url: new FormControl(''),
    icon: new FormControl(''),
    groupe: new FormControl(''),
  });

  submitted:boolean = false;


  constructor(private router: Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute,
    private groupeActionServices:GroupeActionService, private actionServices:ActionService) { }

  ngOnInit(): void {

    this.url = atob(this.activatedRoute.snapshot.params.url);
    
    this.actionServices.getActions(this.url)
    .subscribe(data=>{
  
      this.currentAction = data;
      console.log(this.currentAction);
      this.onGetAllgroupeActions();
      this.initForm();
      
    },err=>{

    })
  }


  initForm() {
    if (this.currentAction) {
      this.actionFormGroup = this.fb.group({
        libelle:[this.currentAction.libelle,Validators.required],
        url:[this.currentAction.url,Validators.required],
        icon: [this.currentAction.icon, Validators.required],
        groupe: [this.currentAction.groupe, Validators.required]
        
      })
    }
  }

  onGetAllgroupeActions() {
    this.groupeActionServices.getAllGroupeActions()
      .subscribe(response => {
      this.groupes = response
      console.log(this.groupes); 
    });
  }

  onUpdateAction() {
    
    console.log(this.actionFormGroup?.value);
     
    this.actionServices.updateActions(this.url, this.actionFormGroup?.value)
      .subscribe(data => {
       alert("Mise à jour effectuée avec Succès");
      this.router.navigateByUrl("/actions");
    },err=>{

    })

  }

  redirection(route:string){
    this.router.navigateByUrl("/"+route);
  }

}
