import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';
import { DepenseService } from 'src/app/services/depense.service';
import { ServiceService } from 'src/app/services/service.service';
// import { ActionEvent, DataStateEnum, DEPENSEACTIONTYPES } from 'src/app/state/depense.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {

  depenses?: any;
  services?: any = [];
  //readonly DataStateEnum = DataStateEnum;
  
  
  baseUrl =  environment.adminUrl;

  constructor(private depenseService:DepenseService, private serviceService:ServiceService, private router:Router, private communService:CommunService) { }

  ngOnInit(): void {
    this.onGetAllDepenses();
  }


  //get All depenses method
  onGetAllDepenses(){

    this.depenseService.getAllDepenses()
      .subscribe(response => {
        this.depenses = response._embedded.depenses;
        console.log(this.depenses);

        for (let depense of response._embedded.depenses) {
          let urlService = depense._links.service.href;
    
          this.communService.getItem(urlService).subscribe(dt => {
            this.services.push(dt);
            console.log(this.services);
          });
        }
        
       
      });

  }

  onGetEnabledDepenses(){
    
    this.depenseService.getEnabledDepenses()
      .subscribe(response => {
        this.depenses = response
        console.log(this.depenses);
    
    });
  }

  onSearch(dataForm: any){
    
    this.depenseService.searchDepense(dataForm)
      .subscribe(response => {
        this.depenses = response
        console.log(this.depenses);
    
    });

  }

  onDeleteDepense(u:any){

    let url = u._links.self.href;
    let id = this.communService.getObjectId(url);
    let res = confirm("Vous voulez vraiment supprimer ? ");
    if(res == true)
      this.depenseService.deleteDepense(id).subscribe(data=>{
      this.onGetAllDepenses();
    })
  }

  onAddDepense(){
    this.router.navigateByUrl(this.baseUrl+"/add-depenses");
  }
  

  onUpdateDepense(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/update-depenses/"+btoa(url));
  }

  onViewDepense(u: any) {
     
    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/list-depenses/"+btoa(url));
  }
  

  // onActionEvent($event: ActionEvent) {
  //   switch ($event.type) {
  //     case DEPENSEACTIONTYPES.GET_ALL_DEPENSES: this.onGetAllDepenses(); break;
  //     case DEPENSEACTIONTYPES.GET_AVAILABLE_DEPENSES: this.onGetEnabledDepenses(); break;
  //     case DEPENSEACTIONTYPES.NEW_DEPENSE: this.onAddDepense(); break;
  //     case DEPENSEACTIONTYPES.SEARCH_DEPENSES: this.onSearch($event.payload); break;
  //   }
  // }

}
