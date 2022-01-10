import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CommunService } from 'src/app/services/commun.service';
import { User } from '../../models/User.model';
import { UsersService } from '../../services/user.service';
import { ActionEvent, AppDataState, DataStateEnum, USERACTIONTYPES } from '../../state/user.state';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //users$:Observable<AppDataState<User[]>> |null=null; //users?:User[]; //l'une des deux 
  users?: any;
  usersProfiles: any = [];

  readonly DataStateEnum = DataStateEnum;

  constructor(private usersService: UsersService,private router: Router, private communService:CommunService) { }


  ngOnInit(): void {
    this.onGetAllUsers();
  }

  

  onGetAllUsers(){
    // this.users$=this.usersService.getAllUsers().pipe(
    //   map(data=>({dataState:DataStateEnum.LOADED,data:data})),
    //   startWith({dataState:DataStateEnum.LOADING}),
    //   catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    // );

    this.usersService.getAllUsers()
      .subscribe(response => {
        this.users = response.content

        // for (let u of this.users) {
        //   this.communService.getItem(u._links.profile.href).subscribe(dt => {
        //     this.usersProfiles.push(dt.libelle);
        //     console.log(this.usersProfiles);
        //   });
        // }
    
    });
  }

  onGetEnabledUsers(){
    // this.users$=this.usersService.getEnabledUsers().pipe(
    //   map(data=>({dataState:DataStateEnum.LOADED,data:data})),
    //   startWith({dataState:DataStateEnum.LOADING}),
    //   catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    // );

    this.usersService.getEnabledUsers()
      .subscribe(response => {
        this.users = response
        console.log(this.users);
    
    });
  }

  onSearch(dataForm: any){
    // this.users$=this.usersService.searchUser(dataForm.keyWord).pipe(
    //   map(data=>({dataState:DataStateEnum.LOADED,data:data})),
    //   startWith({dataState:DataStateEnum.LOADING}),
    //   catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    // );

    this.usersService.searchUser(dataForm)
      .subscribe(response => {
        this.users = response
        console.log(this.users);
    
    });

  }

  onDeleteUser(u:any){
    
    let url = u.id;
    let res = confirm("Vous voulez vraiment supprimer ? ");
    if(res == true)
      this.usersService.deleteUser(url).subscribe(data=>{
      this.onGetAllUsers();
    })
   
  }

  onAddUser(){
    this.router.navigateByUrl("/admin/add-users");
  }
  

  onUpdateUser(u:any){
    let url = u.id;
    this.router.navigateByUrl("/admin/update-users/"+btoa(url));
  }

  onViewUser(u: any) {
    
    let url = u.id;
    this.router.navigateByUrl("/admin/list-users/"+btoa(url));
  }
  

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case USERACTIONTYPES.GET_ALL_USERS: this.onGetAllUsers(); break;
      case USERACTIONTYPES.GET_AVAILABLE_USERS: this.onGetEnabledUsers(); break;
      case USERACTIONTYPES.NEW_USER: this.onAddUser(); break;
      case USERACTIONTYPES.SEARCH_USERS: this.onSearch($event.payload); break;
    }
  }

}
