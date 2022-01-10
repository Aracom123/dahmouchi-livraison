import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colis } from '../models/colis.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ColisService {

  constructor(private http:HttpClient,private authService: AuthService){

  }

  
  
  //get all Coliss
  tokenType = 'Bearer '; 
  getAllColiss(page:number, size: number):Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.get<any>(host + "/colis?page="+page+"&size="+size, {headers: headers});
  }

  //get enabled colis
  getEnabledColiss():Observable<any>{

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<Colis[]>(host+"/colis/?statut=true", {headers: headers});
  }
 

  //search Colis
  searchColis(keyWord:string):Observable<any>{

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<Colis[]>(host+"/colis?nom_like="+keyWord, {headers: headers});
  }

  //delete Colis
  deleteColis(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/colis/"+id, {headers: headers});
  }
  
  //save Tache
  saveColis(colis:Colis):Observable<Colis>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<Colis>(host+"/colis",colis, {headers: headers});
  }

  //get colis
  getColiss(id:number):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/colis/"+id, {headers: headers});
  }

  //update colis
  updateColiss(id:number, colis:Colis):Observable<Colis>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;

      return this.http.put<Colis>(host+"/colis/"+id, colis, {headers: headers});
  }
}
