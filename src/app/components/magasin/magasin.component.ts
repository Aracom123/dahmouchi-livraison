import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { ActionEvent, DataStateEnum, MAGASINACTIONTYPES } from 'src/app/state/magasin.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {

  magasins?: any;
  readonly DataStateEnum = DataStateEnum;
  
  
  baseUrl =  environment.adminUrl;

  constructor(private magasinService:MagasinService, private router:Router, private communService:CommunService) { }

  ngOnInit(): void {
    this.onGetAllMagasins();
  }


  //get All magasins method
  onGetAllMagasins(){

    this.magasinService.getAllMagasins()
      .subscribe(response => {
        this.magasins = response

        //console.log(this.magasins)
    });
  }

  onGetEnabledMagasins(){
    
    this.magasinService.getEnabledMagasins()
      .subscribe(response => {
        this.magasins = response
        console.log(this.magasins);
    
    });
  }

  onSearch(dataForm: any){
    
    this.magasinService.searchMagasin(dataForm)
      .subscribe(response => {
        this.magasins = response
        console.log(this.magasins);
    
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

  onAddMagasin(){
    this.router.navigateByUrl(this.baseUrl+"/add-magasins");
  }
  

  onUpdateMagasin(u:any){

    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/update-magasins/"+btoa(url));
  }

  onViewMagasin(u: any) {
     
    let url = u._links.self.href;
    this.router.navigateByUrl(this.baseUrl+"/list-magasins/"+btoa(url));
  }
  

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case MAGASINACTIONTYPES.GET_ALL_MAGASINS: this.onGetAllMagasins(); break;
      case MAGASINACTIONTYPES.GET_AVAILABLE_MAGASINS: this.onGetEnabledMagasins(); break;
      case MAGASINACTIONTYPES.NEW_MAGASIN: this.onAddMagasin(); break;
      case MAGASINACTIONTYPES.SEARCH_MAGASINS: this.onSearch($event.payload); break;
    }
  }

}
