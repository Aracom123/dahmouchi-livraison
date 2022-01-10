import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupeActionService } from 'src/app/services/groupe-action.service';
import { ActionEvent, DataStateEnum, GROUPEACTIONACTIONTYPES } from 'src/app/state/groupe-action.state';

@Component({
  selector: 'app-groupe-actions',
  templateUrl: './groupe-actions.component.html',
  styleUrls: ['./groupe-actions.component.css']
})
export class GroupeActionsComponent implements OnInit {

  groupes?: any;
  readonly DataStateEnum = DataStateEnum;
  

  constructor(private groupeActionServices:GroupeActionService, private router:Router) { }

  ngOnInit(): void {
    this.onGetAllGroupeActions();
  }


  //get All action method
  onGetAllGroupeActions(){

    this.groupeActionServices.getAllGroupeActions()
      .subscribe(response => {
        this.groupes = response
        console.log(response);
    });
  }

  onGetEnabledGroupeActions(){
    
    this.groupeActionServices.getEnabledGroupeActions()
      .subscribe(response => {
        this.groupes = response
        console.log(this.groupes);
    
    });
  }

  onSearch(dataForm: any){
    
    this.groupeActionServices.searchGroupeAction(dataForm)
      .subscribe(response => {
        this.groupes = response
        console.log(this.groupes);
    
    });

  }

  onDeleteGroupeAction(u:any){

    let url = u._links.self.href;
    let res = confirm("Vous voulez vraiment supprimer ? ");
    if(res == true)
      this.groupeActionServices.deleteGroupeAction(url).subscribe(data=>{
      this.onGetAllGroupeActions();
    })
  }

  onAddGroupeAction(){
    this.router.navigateByUrl("/add-groupe-actions");
  }
  

  onUpdateGroupeAction(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl("/update-groupe-actions/"+btoa(url));
  }

  onViewGroupeAction(u: any) {
     
    let url = u._links.self.href;
    this.router.navigateByUrl("/list-groupe-actions/"+btoa(url));
  }
  

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case GROUPEACTIONACTIONTYPES.GET_ALL_GROUPE_ACTIONS: this.onGetAllGroupeActions(); break;
      case GROUPEACTIONACTIONTYPES.GET_AVAILABLE_GROUPE_ACTIONS: this.onGetEnabledGroupeActions(); break;
      case GROUPEACTIONACTIONTYPES.NEW_GROUPE_ACTION: this.onAddGroupeAction(); break;
      case GROUPEACTIONACTIONTYPES.SEARCH_GROUPE_ACTIONS: this.onSearch($event.payload); break;
    }
  }

}
