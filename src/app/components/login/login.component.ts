import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;

  @ViewChild('nameRef') nameElementRef?: ElementRef;
  
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group( {
      login:[ '' , Validators.required] ,
      password: ['', Validators.required]
    });
    
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group( {
      login:[ '' , Validators.required] ,
      password:['',Validators.required]
    }) ;
  }

  ngAfterViewInit() {
    this.nameElementRef?.nativeElement.focus();
    //console.log(this.nameElementRef);
  }

  get f() { return this.loginForm.controls; }

  login() {

    let token:any;
    let data = {
      login: this.f.login.value,
      password: this.f.password.value
    }
   
    //console.log(data);
    this.authService.login(data) 
      .subscribe(response => {
      
        token = response.body;
        console.log("--- token  ----");
        console.log(token);
        
      this.authService.doLoginUser(data.login, token);
      if(token.profile == "ADMIN"){
        this.router.navigateByUrl("/admin");
      }
      else{
        this.router.navigateByUrl("/vendeur");
      }
      
    });
 
  }

}
