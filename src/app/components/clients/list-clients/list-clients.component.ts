import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CommunService } from 'src/app/services/commun.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  clients?:any;
  client?: any;
  //clientId: number;
  id: number = 0;

  baseUrl = environment.adminUrl;
  
  public currentPage:number = 0;
  public size:number=10;
  public totalPages:number = 0;
  public pages?:Array<number>;
  
  constructor(private clientService:ClientService, private router:Router, 
    private activatedRoute: ActivatedRoute, private communService:CommunService) {
      //this.clientId = this.activatedRoute.snapshot.params.id;
     }

  ngOnInit(): void {
    let url = atob(this.activatedRoute.snapshot.params.url);
    this.id = this.communService.getObjectId(url);
    this.onGetClient();
  }



  onGetClient(){
    
     this.clientService.getClients(this.id)
      .subscribe(response => {
        this.client = response
        
        console.log(this.client);   
    });
  }

  onGetAllClients(){
    
    this.clientService.getAllClients(this.currentPage, this.size)
      .subscribe(response => {
        this.clients = response
    
        this.totalPages = response["page"].totalPages;
        this.pages = new Array(this.totalPages);
    });
  }

  onGetPages(i:number){
    this.currentPage=i;
    this.onGetAllClients();
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

  onUpdateClient(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/update-clients/"+btoa(url));
  }
      

}
