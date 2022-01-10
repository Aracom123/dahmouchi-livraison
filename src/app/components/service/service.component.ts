import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';
import { ServiceService } from 'src/app/services/service.service';
//import { ActionEvent, DataStateEnum, SERVICEACTIONTYPES } from 'src/app/state/service.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services?: any;
  //readonly DataStateEnum = DataStateEnum;
  
  
  baseUrl =  environment.adminUrl;

  constructor(private serviceService:ServiceService, private router:Router, private communService:CommunService) { }

  ngOnInit(): void {
    this.onGetAllServices();
  }


  //get All services method
  onGetAllServices(){

    this.serviceService.getAllServices()
      .subscribe(response => {
        this.services = response._embedded.services

        //console.log(this.services)
    });
  }

  onGetEnabledServices(){
    
    this.serviceService.getEnabledServices()
      .subscribe(response => {
        this.services = response
        console.log(this.services);
    
    });
  }

  onSearch(dataForm: any){
    
    this.serviceService.searchService(dataForm)
      .subscribe(response => {
        this.services = response
        console.log(this.services);
    
    });

  }

  onDeleteService(u:any){

    let url = u._links.self.href;
    let id = this.communService.getObjectId(url);
    let res = confirm("Vous voulez vraiment supprimer ? ");
    if(res == true)
      this.serviceService.deleteService(id).subscribe(data=>{
      this.onGetAllServices();
    })
  }

  onAddService(){
    this.router.navigateByUrl(this.baseUrl+"/add-services");
  }
  

  onUpdateService(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/update-services/"+btoa(url));
  }

  onViewService(u: any) {
     
    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/list-services/"+btoa(url));
  }
  

  // onActionEvent($event: ActionEvent) {
  //   switch ($event.type) {
  //     case SERVICEACTIONTYPES.GET_ALL_SERVICES: this.onGetAllServices(); break;
  //     case SERVICEACTIONTYPES.GET_AVAILABLE_SERVICES: this.onGetEnabledServices(); break;
  //     case SERVICEACTIONTYPES.NEW_SERVICE: this.onAddService(); break;
  //     case SERVICEACTIONTYPES.SEARCH_SERVICES: this.onSearch($event.payload); break;
  //   }
  // }

}
