import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';
import { GroupeActionService } from 'src/app/services/groupe-action.service';

@Component({
  selector: 'app-add-actions',
  templateUrl: './add-actions.component.html',
  styleUrls: ['./add-actions.component.css']
})
export class AddActionsComponent implements OnInit {

  actionFormGroup = new FormGroup({
    libelle: new FormControl(''),
    icon: new FormControl(''),
    url: new FormControl(''),
    groupe: new FormControl('')
  });

  groupes?: any;
  submitted:boolean = false;


  constructor(private actionServices: ActionService, private groupeActionServices:GroupeActionService, 
    private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit(): void {
    this.actionFormGroup = this.fb.group({
      libelle:["",Validators.required],
      url:["",Validators.required],
      icon:["",Validators.required],
      groupe:["",Validators.required]
    });


  
  }

  onGetAllgroupeActions() {
    this.groupeActionServices.getAllGroupeActions()
      .subscribe(response => {
      this.groupes = response
      console.log(this.groupes); 
    });
  }


  onSaveAction(){
    this.submitted = true;
    if (this.actionFormGroup?.invalid) return;
    
    this.actionServices.saveAction(this.actionFormGroup?.value).subscribe(data => {
      alert("Action ajouté avec succès");
      this.redirection("actions");
    });

    
  }

  redirection(route:string){
    this.router.navigateByUrl("/"+route);
  }


}
