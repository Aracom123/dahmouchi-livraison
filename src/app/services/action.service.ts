import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Achat } from '../models/achat.model';
import { Action } from '../models/action.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  tokenType = 'Bearer ';
  
  getAllActions():Observable<any>{
      
    let host = environment.host;
      
      const header = new HttpHeaders({ 'authorization': this.tokenType +this.authService.getJwtToken(), 'responseType': 'json' });
      const headers = { headers: header };
      
      
      return this.http.get<any>(host + "/actions");
  }

  //get enabled actions
  getEnabledActions():Observable<any>{

      let host = environment.host;
      const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
      const headers = { headers: header };
      
      return this.http.get<Action[]>(host+"/actions/?statut=true", headers);
  }
 

  //search Action
  searchAction(keyWord:string):Observable<any>{

      let host = environment.host;
      const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
      const headers = { headers: header };
      
      return this.http.get<Action[]>(host+"/actions?nom_like="+keyWord, headers);
  }

  //delete Action
  deleteAction(url:string):Observable<void>{
    let host = environment.host;
    const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
    const headers = { headers: header };
    
    return this.http.delete<void>(url);
}
  
  //save action method
  saveAction(action:Action):Observable<Action>{
      let host = environment.host;
      const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
      const headers = { headers: header };
              
      return this.http.post<Action>(host+"/actions",action);
  }

  //get Action
    getActions(url:string):Observable<any>{
    let host = environment.host;
    const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
    const headers = { headers: header };
    
    return this.http.get<any>(url);
  }

  //update Action
  updateActions(url:string, action:Action):Observable<Action>{
    let host = environment.host;
    const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
    const headers = { headers: header };
    
    return this.http.put<Action>(url, action);
  }
}

