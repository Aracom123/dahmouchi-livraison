import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-magasin',
  templateUrl: './list-magasin.component.html',
  styleUrls: ['./list-magasin.component.css']
})
export class ListMagasinComponent implements OnInit {

  magasins?:any;
  magasin?: any;
  id: number = 0;

  baseUrl =  environment.adminUrl;

  constructor(private magasinService:MagasinService, private router:Router, 
    private activatedRoute: ActivatedRoute, private communService:CommunService) {
      
  }

  ngOnInit(): void {
    let url = atob(this.activatedRoute.snapshot.params.url);
    this.id = this.communService.getObjectId(url);
   
    this.onGetMagasin();
  }


  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }


  onGetMagasin(){
    
     this.magasinService.getMagasin(this.id)
      .subscribe(response => {
        this.magasin = response
        
        console.log(this.magasin);   
    });
  }

  onGetAllMagasins(){
    
    this.magasinService.getAllMagasins()
      .subscribe(response => {
        this.magasins = response
    
    });
  }

  onDeleteMagasin(u:any){

    let url = u._links.self.href;
    let id = this.communService.getObjectId(url);
    let res = confirm("Vous voulez vraiment supprimer ? ");
    if(res == true)
      this.magasinService.deleteMagasin(id).subscribe(data=>{
      this.onGetAllMagasins();
    })
   
    
  }

  onUpdateMagasin(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"update-magasins/"+btoa(url));
  }

}
