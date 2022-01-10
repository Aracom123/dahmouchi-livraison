import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { CommunService } from 'src/app/services/commun.service';
import { UsersService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  userFormGroup = new FormGroup({
    email: new FormControl(''),
    login: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    numero: new FormControl(''),
    motdepasse: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmmotdepasse: new FormControl(null, [Validators.required]),
    profile: new FormControl(''),
    magasin: new FormControl(''),
    statut: new FormControl('')
  });

  submitted:boolean = false;

  profiles?: any;
  baseUrl =  environment.adminUrl;

  magasins: any;
 

  constructor(private userService:UsersService, 
    private communService: CommunService, 
    private profileService: ProfileService, 
    private fb:FormBuilder , 
    private router:Router) {
    
  }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      email:["",Validators.required],
      login:["",Validators.required],
      nom:["",Validators.required],
      prenom:["",Validators.required],
      numero:["",Validators.required],
      profile:["",Validators.required],
      statut:[false,Validators.required],
      motdepasse: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmmotdepasse: new FormControl(null, [Validators.required]),  
    },
    {
        validators: this.MustMutch('motdepasse', 'confirmmotdepasse')
    });

    this.onGetAllProfiles();
    // this.onGetAllMagasins();
  }

  get f(){return this.userFormGroup.controls}

  MustMutch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const macthingControl = formGroup.controls[matchingControlName];
      if (macthingControl.errors && !macthingControl.errors.MustMutch) {
        return
      }
      if (control.value !== macthingControl.value) {
        macthingControl.setErrors({ MustMutch: true});
      }
      else {
        macthingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.userFormGroup.invalid) {
      return;
    }
  }


  onGetAllProfiles() {
    this.profileService.getAllProfiles()
      .subscribe(response => {
      this.profiles = response._embedded.profiles;
      let index = 0;
      for(let profile of this.profiles){
        let idPro = this.communService.getObjectId(profile._links.self.href);
        this.profiles[index].idProfile = idPro;
        index++;
      }
      //console.log(this.profiles); 
    });
  }

   /**
   * get all magasins
   */
    // onGetAllMagasins() {
    //   this.magasinServices.getAllMagasins()
    //     .subscribe(response => {
    //       this.magasins = response._embedded.magasins;
    //       for(let i=0; i<this.magasins.length; i++){
    //         let urlMag = this.magasins[i]._links.self.href;
    //         let idMag = this.communService.getObjectId(urlMag);
    //         this.magasins[i].idMagasin = idMag;
    //       }
    //       console.log(this.magasins);
    //   });
    // }

  onSaveUser() {
    this.onSubmit();
    this.submitted = true;
    if (this.userFormGroup?.invalid) return;
    console.log(this.userFormGroup?.value);
    // let idMagasin = this.communService.getObjectId(this.userFormGroup?.value.magasin._links.self.href);
    // this.userFormGroup.value.magasin.idMagasin = idMagasin;
    this.userService.saveUser(this.userFormGroup?.value).subscribe(data => {
      alert("Utilisateur ajouté avec succès");
      this.redirection("users");
    });

    
  }

  redirection(route:string){
    this.router.navigateByUrl(this.baseUrl+"/"+route);
  }


}
