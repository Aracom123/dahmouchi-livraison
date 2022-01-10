import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})
export class ListActionsComponent implements OnInit {

  actions?:any;
  action?: any;
  url = '';

  constructor(private actionServices:ActionService, private router:Router, 
    private activatedRoute: ActivatedRoute) {
      
  }

  ngOnInit(): void {
    this.url = atob(this.activatedRoute.snapshot.params.url);
   
    this.onGetAction();
  }



  onGetAction(){
    
     this.actionServices.getActions(this.url)
      .subscribe(response => {
        this.action = response
        
        console.log(this.action);   
    });
  }

  onGetAllActions(){
    
    this.actionServices.getAllActions()
      .subscribe(response => {
        this.actions = response
    
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

  onUpdateAction(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl("/update-actions/"+btoa(url));
  }

}
