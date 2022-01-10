import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CommunService } from 'src/app/services/commun.service';
import { ActionEvent, CLIENTACTIONTYPES } from 'src/app/state/client.state';
import { DataStateEnum } from 'src/app/state/client.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  baseUrl =  environment.adminUrl;

  //users$:Observable<AppDataState<User[]>> |null=null; //users?:User[]; //l'une des deux 
  clients?: any;
  readonly DataStateEnum = DataStateEnum;
  
  public currentPage:number = 0;
  public size:number=25;
  public totalPages:number = 0;
  public pages?: Array<number>;

  constructor(private clientService:ClientService, private router:Router, private communService:CommunService) { }

  ngOnInit(): void {
    this.onGetAllClients();
  }


  //get All customer method
  onGetAllClients(){
    
    this.clientService.getAllClients(this.currentPage, this.size)
      .subscribe(response => {
        this.clients = response._embedded.clients

        this.totalPages = response["page"].totalPages;
        this.pages = new Array(this.totalPages);
    });
  }

  onGetPages(i:number){
    this.currentPage = i;
    
    this.onGetAllClients();
  }

  onGetEnabledClients(){
    
    this.clientService.getEnabledClients()
      .subscribe(response => {
        this.clients = response
        console.log(this.clients);
    
    });
  }

  onSearch(dataForm: any){

    this.clientService.searchClient(dataForm)
      .subscribe(response => {
        this.clients = response
        console.log(this.clients);
    
    });

  }

  onDeleteClient(u:any){

    let url = u._links.self.href;
    let id = this.communService.getObjectId(url);
    let res = confirm("Vous voulez vraiment supprimer ? ");
    if(res == true)
      this.clientService.deleteClient(id).subscribe(data=>{
      this.onGetAllClients();
    })
  }

  onAddClient(){
    this.router.navigateByUrl(this.baseUrl+"/add-clients");
  }
  

  onUpdateClient(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/update-clients/"+btoa(url));
  }

  onViewClient(u: any) {
     
    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/list-clients/"+btoa(url));
  }
  

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case CLIENTACTIONTYPES.GET_ALL_CLIENTS: this.onGetAllClients(); break;
      case CLIENTACTIONTYPES.GET_AVAILABLE_CLIENTS: this.onGetEnabledClients(); break;
      case CLIENTACTIONTYPES.NEW_CLIENT: this.onAddClient(); break;
      case CLIENTACTIONTYPES.SEARCH_CLIENTS: this.onSearch($event.payload); break;
    }
  }

}
