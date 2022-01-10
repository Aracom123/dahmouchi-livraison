import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UsersService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  user?: any;
  profile?: any;
  users?: any;
  url = '';
  baseUrl = environment.adminUrl;
  
  
  constructor(private userServices:UsersService, private router:Router, 
    private profileService:ProfileService, private communService: CommunService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = atob(this.activatedRoute.snapshot.params.url);
   
    this.onGetUsers();
  }

  onGetAllUsers(){
    this.userServices.getAllUsers()
      .subscribe(response => {
        this.users = response
    
    });
  }


  onGetUsers(){
    
    let id:number = this.communService.getObjectId(this.url);
     this.userServices.getUsers(id)
      .subscribe(response => {
        this.user = response
        // console.log("---- User  -----");
        // console.log(this.user);
        
        this.onGetProfile();
           
    });
  }

  onGetProfile(){
    let id:number = this.communService.getObjectId(this.url);
    this.profileService.getProfiles(id)
     .subscribe(response => {
       this.profile = response
       
      //console.log("profile  => " + this.profile);
   
   });
 }

  onDeleteUser(u:any){
    
    let url = u._links.self.href;
    let res = confirm("Vous voulez vraiment supprimer ?");
    if(res == true)
      this.userServices.deleteUser(url).subscribe(data=>{
      this.onGetAllUsers();
    }) 
    
  }
  
  onUpdateUser(u:any){
    let url = u._links.self.href;
    this.redirection("update-users/"+btoa(url));
  }

  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }

}
