import { HttpClient } from '@angular/common/http';
import { Component, Directive, OnInit, Input } from '@angular/core';
import { Token } from '../../models/token.model';
import { Tokens } from '../../models/tokens.model';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input('navbar') navbar:boolean = true;

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string | null = null;
  isConnected$:Observable<boolean> = new Observable<boolean>();
  //isLoggedIn$: Observable<boolean>;
  public connectedUser: any; 
  
  constructor(private http: HttpClient, private authService:AuthService,  private router: Router) { }

  ngOnInit(): void {
    this.isConnected$ = this.authService.loggedIn; // {2}
    this.connectedUser = this.authService.getConnectedUserData();
  }

  login(data: any) {
    return this.http.post<Token>(`${environment.host}/login`,data,{observe:'response'});
  }

  logout() {
    return this.http.post<any>(`${environment.host}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !this.authService.isLoggedIn();
  }

refreshToken() {
  return this.http.post<any>(`${environment.host}/refresh`, {
    'refreshToken': this.getRefreshToken()
  }).pipe(tap((tokens: Tokens) => {
    this.storeJwtToken(tokens.jwt);
  }));
}

getJwtToken() {
  return localStorage.getItem(this.JWT_TOKEN);
}

public doLoginUser(username: string, token?: Token) {
  this.loggedUser = username;
  if(token != null){
    this.storeJwtToken(token.token);
  }
}

private doLogoutUser() {
  this.loggedUser = null;
  this.removeTokens();
}

onLogout(){
  this.authService.logout(); 
  this.router.navigate(['/login']);                     // {3}
}

private getRefreshToken() {
  return localStorage.getItem(this.REFRESH_TOKEN);
}

private storeJwtToken(jwt: string) {
  localStorage.setItem(this.JWT_TOKEN, jwt);
}

private storeTokens(tokens: Tokens) {
  localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
  localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
}

private removeTokens() {
  localStorage.removeItem(this.JWT_TOKEN);
  localStorage.removeItem(this.REFRESH_TOKEN);
}

}
