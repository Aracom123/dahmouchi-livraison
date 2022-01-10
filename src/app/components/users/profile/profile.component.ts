import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { ActionEvent, USERACTIONTYPES } from 'src/app/state/user.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profiles?: any;

  constructor(private profileService: ProfileService,private router: Router) { }

  ngOnInit(): void {
  }

  onGetAllProfiles() {
    this.profileService.getAllProfiles()
      .subscribe(response => {
      this.profiles = response
      console.log(this.profiles); 
    });
  }

  

  onSearch(dataForm: any){
    // this.users$=this.profileService.searchUser(dataForm.keyWord).pipe(
    //   map(data=>({dataState:DataStateEnum.LOADED,data:data})),
    //   startWith({dataState:DataStateEnum.LOADING}),
    //   catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    // );

    this.profileService.searchProfile(dataForm)
      .subscribe(response => {
        this.profiles = response
        console.log(this.profiles);
    
    });

  }

  onDeleteProfile(p:Profile){
    let res = confirm("Vous voulez vraiment supprimer ? ");
    if(res == true)
    this.profileService.deleteProfile(p.id_profile).subscribe(data=>{
    this.onGetAllProfiles();
    })
  }

  onAddProfile(){
    this.router.navigateByUrl("/add-users");
  }
  

  onUpdateProfile(p:Profile){
    this.router.navigateByUrl("/update-users/"+p.id_profile);
  }

  onViewProfile(p:Profile){
    this.router.navigateByUrl("/list-users");
  }
  

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case USERACTIONTYPES.GET_ALL_USERS: this.onGetAllProfiles(); break;
      case USERACTIONTYPES.NEW_USER: this.onAddProfile(); break;
      case USERACTIONTYPES.SEARCH_USERS: this.onSearch($event.payload); break;
    }
  }

}
