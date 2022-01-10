import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  tokenType = 'Bearer ';
  
  //get all magins method
  getAllServices():Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
    let host = environment.host;
      
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<any>(host + "/services", {headers: headers});
  }

  //get enabled services
  getEnabledServices():Observable<any>{

    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.get<Service[]>(host+"/service/?statut=true", {headers: headers});
  }
 

  //search Service
  searchService(keyWord:string):Observable<any>{

    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<Service[]>(host+"/service?nom_like="+keyWord, {headers: headers});
  }

  //delete Service
  deleteService(id:number):Observable<void>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.delete<void>(host+"/services/"+id, {headers: headers});
  }
  
  //save Service method
  saveService(service:Service):Observable<Service>{
      let host = environment.host;
      let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
              
      return this.http.post<Service>(host+"/services",service, {headers: headers});
  }

  //get Service
    getService(id:number):Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.get<any>(host+"/services/"+id ,{headers: headers});
}

  //update Service
  updateServices(id:number, service:Service):Observable<Service>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.put<Service>(host+"/services/"+id, service, {headers: headers});
  }

}
