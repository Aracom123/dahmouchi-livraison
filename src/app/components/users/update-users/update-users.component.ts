import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/User.model';
import { ProfileService } from 'src/app/services/profile.service';
import { UsersService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommunService } from 'src/app/services/commun.service';


@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

  public currentUser?: User;
  public id:number = 0;

  userFormGroup = new FormGroup({
    email: new FormControl(''),
    login: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    motdepasse: new FormControl(''),
    profile: new FormControl(''),
    statut: new FormControl('')
  });

  submitted:boolean = false;
  profiles?: any;
  adminBaseURL = environment.adminUrl;
 

  constructor(private router: Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute,
    private userService:UsersService, private coummunService: CommunService, private profileService: ProfileService, private http:HttpClient) { }

  ngOnInit(): void {

    let url = atob(this.activatedRoute.snapshot.params.url);
    this.id = this.coummunService.getObjectId(url);
    this.userService.getUsers(this.id)
    .subscribe(data=>{
      
      this.currentUser = data;
      //console.log(this.currentUser);
      this.onGetAllProfiles();
      this.initForm();
      
    },err=>{

    })
  }


  onGetAllProfiles() {
    this.profileService.getAllProfiles()
      .subscribe(response => {
      this.profiles = response
    });
  }


  initForm() {
    if (this.currentUser) {
      this.userFormGroup = this.fb.group({
        email:[this.currentUser.email,Validators.required],
        login:[this.currentUser.login,Validators.required],
        nom:[this.currentUser.nom,Validators.required],
        prenom:[this.currentUser.prenom,Validators.required],
        numero:[this.currentUser.numero,Validators.required],
        profile:[this.currentUser.profile,Validators.required],
        statut:[false,Validators.required],
        motdepasse:['',Validators.required]
      })
    }
  }

  //update user
    // updateUsers(id:number, user:any):Observable<User>{
    //     let host = environment.host;
        
    //     return this.http.put<User>(id, user);
    // }
  
  onUpdateUser() {
    console.log(this.userFormGroup.value);
    this.currentUser = this.userFormGroup.value;
    //console.log(this.currentUser);
    this.userService.updateUsers(this.id, this.userFormGroup?.value)
      .subscribe(data => {
       alert("Mise à jour effectuée avec Succès");
      this.router.navigateByUrl(this.adminBaseURL+ "/users");
    },err=>{

    })

  }

  redirection(route:string){
    this.router.navigateByUrl(this.adminBaseURL+"/"+route);
  }

}
