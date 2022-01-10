import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompagniePartenaire } from '../models/compagnie.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {  //Compagnie Partenaire Service
  constructor(private http:HttpClient,private authService: AuthService){

  }

  
  
  //get all CompagniePartenaires
  tokenType = 'Bearer '; 
  getAllCompagniePartenaires(page:number, size: number):Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.get<any>(host + "/compagniePartenaires?page="+page+"&size="+size, {headers: headers});
  }

  //get enabled /
  getEnabledCompagniePartenaires():Observable<any>{

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<CompagniePartenaire[]>(host+"/compagniePartenaires?statut=true", {headers: headers});
  }
 

  //search CompagniePartenaire
  searchCompagniePartenaire(keyWord:string):Observable<any>{

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<CompagniePartenaire[]>(host+"/compagniePartenaires?nom_like="+keyWord, {headers: headers});
  }

  //delete CompagniePartenaire
  deleteCompagniePartenaire(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/compagniePartenaires/"+id, {headers: headers});
  }
  
  //save Tache
  saveCompagniePartenaire(compagniePartenaire:CompagniePartenaire):Observable<CompagniePartenaire>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<CompagniePartenaire>(host+"/compagniePartenaires",compagniePartenaire, {headers: headers});
  }

  //get compagniePartenaire
  getCompagniePartenaires(id:number):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/compagniePartenaires/"+id, {headers: headers});
  }

  //update compagniePartenaire
  updateCompagniePartenaires(id:number, compagniePartenaire:CompagniePartenaire):Observable<CompagniePartenaire>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;

      return this.http.put<CompagniePartenaire>(host+"/compagniePartenaires/"+id, compagniePartenaire, {headers: headers});
  }  
}
