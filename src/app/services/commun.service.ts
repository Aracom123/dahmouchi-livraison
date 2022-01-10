import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  tokenType = 'Bearer ';
  constructor(private http:HttpClient, private authService: AuthService) { }

  /**
   * 
   * @param url : url de l'objrct
   * @returns : l'identifiant de l'objet
   */
   getObjectId(url: any):number {
    let l = url.split("/");
    l = l.reverse();
    return Number(l[0]);
   }
  
  getItem(url: string):Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    url = url; //.substring(25);  
    let host = environment.host;
    return this.http.get<any>(url, {headers: headers});
  }

  getSocieteInformations():Observable<any>  {
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<any>(host+"/societes", {headers: headers})
  }
  
}
