import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { Token } from '../models/token.model';
import { Tokens } from '../models/tokens.model';
//import * as moment from "moment";
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly EXPIRES_AT = 'EXPIRES_AT';
    private readonly JWT_LOGIN = 'JWT_LOGIN';
    private readonly USER_NOM = 'USER_NOM';
    private readonly USER_PRENOM = 'USER_PRENOM';
    private readonly USER_ID = 'USER_ID';
    private readonly USER_PROFILE = 'USER_PROFILE';
    private readonly USER_PROFILE_ID = 'USER_PROFILE_ID';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser: string | null = null;
    connect: boolean = false;
    loggedIn = new BehaviorSubject<boolean>(false);
  
    constructor(private http: HttpClient) {}
  
    // login(user: { email: string, password: string }): Observable<boolean> {
    //   return this.http.post<any>(`${environment.host}/login`, user,)
    //     .pipe(
    //       tap(tokens => this.doLoginUser(user.email, tokens)),
    //       mapTo(true),
    //       catchError(error => {
    //         alert(error.error);
    //         return of(false);
    //       }));
    // }

  login(data: any) {
    let host = "https://ara-livraison.herokuapp.com/authenticate";
    return this.http.post<any>(host,data,{observe:'response'});
  }
  
  logout() {
    this.doLogoutUser();
    /*return this.http.post<any>(`${environment.host}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));*/
  }
  
    isLoggedIn() {
      //return !this.getJwtToken();
      return moment().isBefore(this.getExpiresAt());
    }

    get estConnecte() {
      return this.loggedIn.asObservable(); // {2}
    }
  
    refreshToken() {
      return this.http.post<any>(`${environment.host}/refresh`, {
        'refreshToken': this.getRefreshToken()
      }).pipe(tap((tokens: Tokens) => {
        this.storeConnectedUserData(tokens.jwt);
      }));
    }
  
    getJwtToken() {
      return String(localStorage.getItem(this.JWT_TOKEN));
    }

    getExpiresAt() {
      const expiration = String(localStorage.getItem(this.EXPIRES_AT));
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
  
    public doLoginUser(username: string, userData: any) {
      this.loggedUser = username;
      localStorage.setItem(this.JWT_LOGIN, username);
      if(userData != null){
        this.storeConnectedUserData(userData);
        this.loggedIn.next(true);
      }
    }
  
    private doLogoutUser() {
      this.loggedUser = null;
      this.loggedIn.next(false);
      this.removeTokens();
    }
  
    private getRefreshToken() {
      return localStorage.getItem(this.REFRESH_TOKEN);
    }
  
    private storeConnectedUserData(userData: any) {
      // console.log("---- jwt -----");
      // console.log(jwt);
      const expiresAt = moment().add(userData.expiresIn,'second');

      localStorage.setItem(this.EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem(this.JWT_TOKEN, userData.token);
      localStorage.setItem(this.USER_ID, userData.idUser);      
      localStorage.setItem(this.USER_NOM, userData.nom);
      localStorage.setItem(this.USER_PRENOM, userData.prenom);
      localStorage.setItem(this.USER_PROFILE, userData.profile);
      localStorage.setItem(this.USER_PROFILE_ID, userData.idPofile);
    }

    getConnectedUserData(){
      let userData = {
        "id": localStorage.getItem(this.USER_ID),
        "login": localStorage.getItem(this.JWT_LOGIN),
        "nom": localStorage.getItem(this.USER_NOM),
        "prenom": localStorage.getItem(this.USER_PRENOM),
        "profile": localStorage.getItem(this.USER_PROFILE),
        "idProfile": localStorage.getItem(this.USER_PROFILE_ID)
      }

      return userData;
    }
  
    private storeTokens(tokens: Tokens) {
      localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }
  
    private removeTokens() {
      localStorage.removeItem(this.JWT_TOKEN);
      localStorage.removeItem(this.EXPIRES_AT);
      localStorage.removeItem(this.REFRESH_TOKEN);
    }
  }