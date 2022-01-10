import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupeAction } from '../models/groupeaction.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupeActionService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  tokenType = 'Bearer ';
  
  getAllGroupeActions():Observable<any>{
      
    let host = environment.host;
      
      const header = new HttpHeaders({ 'authorization': this.tokenType +this.authService.getJwtToken(), 'responseType': 'json' });
      const headers = { headers: header };
      
      
      return this.http.get<any>(host + "/groupe-actions");
  }

  //get enabled actions
  getEnabledGroupeActions():Observable<any>{

      let host = environment.host;
      const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
      const headers = { headers: header };
      
      return this.http.get<GroupeAction[]>(host+"/groupe-actions/?statut=true", headers);
  }
 

  //search groupe-actions
  searchGroupeAction(keyWord:string):Observable<any>{

      let host = environment.host;
      const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
      const headers = { headers: header };
      
      return this.http.get<GroupeAction[]>(host+"/groupe-actions?nom_like="+keyWord, headers);
  }

  //delete groupe-actions
  deleteGroupeAction(url:string):Observable<void>{
    let host = environment.host;
    const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
    const headers = { headers: header };
    
    return this.http.delete<void>(url);
}
  
  //save action method
  saveGroupeAction(group:GroupeAction):Observable<GroupeAction>{
      let host = environment.host;
      const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
      const headers = { headers: header };
              
      return this.http.post<GroupeAction>(host+"/groupe-actions",group);
  }

  //get Action
    getGroupeAction(url:string):Observable<any>{
    let host = environment.host;
    const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
    const headers = { headers: header };
    
    return this.http.get<any>(url);
  }

  //update GroupeAction
  updateGroupeAction(url:string, groupe:GroupeAction):Observable<GroupeAction>{
    let host = environment.host;
    const header = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
    const headers = { headers: header };
    
    return this.http.put<GroupeAction>(url, groupe);
  }
}
