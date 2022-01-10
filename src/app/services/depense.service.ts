import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Depense } from '../models/depense.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  tokenType = 'Bearer ';
  
  //get all magins method
  getAllDepenses():Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
    let host = environment.host;
      
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<any>(host + "/depenses", {headers: headers});
  }

  //get enabled depenses
  getEnabledDepenses():Observable<any>{

    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.get<Depense[]>(host+"/depense/?statut=true", {headers: headers});
  }
 

  //search Depense
  searchDepense(keyWord:string):Observable<any>{

    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<Depense[]>(host+"/depense?nom_like="+keyWord, {headers: headers});
  }

  //delete Depense
  deleteDepense(id:number):Observable<void>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.delete<void>(host+"/depenses/"+id, {headers: headers});
  }
  
  //save Depense method
  saveDepense(depense:Depense):Observable<Depense>{
      let host = environment.host;
      let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
              
      return this.http.post<Depense>(host+"/depenses",depense, {headers: headers});
  }

  //get Depense
  getDepense(id:number):Observable<any>{
      let host = environment.host;
      let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
      
      return this.http.get<any>(host+"/depenses/"+id ,{headers: headers});
  }

  //get Depense
  getTotalDepense():Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.get<any>(host+"/depenses/search/getTotalDepense" ,{headers: headers});
  }

  //update Depense
  updateDepenses(id:number, depense:Depense):Observable<Depense>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.put<Depense>(host+"/depenses/"+id, depense, {headers: headers});
  }

}
