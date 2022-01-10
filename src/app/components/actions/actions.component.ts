import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';
import { ACTIONACTIONTYPES, ActionEvent, DataStateEnum } from 'src/app/state/action.state';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  actions?: any;
  readonly DataStateEnum = DataStateEnum;
  

  constructor(private actionServices:ActionService, private router:Router) { }

  ngOnInit(): void {
    this.onGetAllActions();
  }


  //get All action method
  onGetAllActions(){

    this.actionServices.getAllActions()
      .subscribe(response => {
        this.actions = response
        console.log(response);
    });
  }

  onGetEnabledActions(){
    
    this.actionServices.getEnabledActions()
      .subscribe(response => {
        this.actions = response
        console.log(this.actions);
    
    });
  }

  onSearch(dataForm: any){
    
    this.actionServices.searchAction(dataForm)
      .subscribe(response => {
        this.actions = response
        console.log(this.actions);
    
    });

  }

  onDeleteAction(u:any){

    let url = u._links.self.href;
    let res = confirm("Vous voulez vraiment supprimer ? ");
    if(res == true)
      this.actionServices.deleteAction(url).subscribe(data=>{
      this.onGetAllActions();
    })
  }

  onAddAction(){
    this.router.navigateByUrl("/add-actions");
  }
  

  onUpdateAction(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl("/update-actions/"+btoa(url));
  }

  onViewAction(u: any) {
     
    let url = u._links.self.href;
    this.router.navigateByUrl("/list-actions/"+btoa(url));
  }
  

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ACTIONACTIONTYPES.GET_ALL_ACTIONS: this.onGetAllActions(); break;
      case ACTIONACTIONTYPES.GET_AVAILABLE_ACTIONS: this.onGetEnabledActions(); break;
      case ACTIONACTIONTYPES.NEW_ACTION: this.onAddAction(); break;
      case ACTIONACTIONTYPES.SEARCH_ACTIONS: this.onSearch($event.payload); break;
    }
  }

}
