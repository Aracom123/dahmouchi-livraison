import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livreur } from '../models/livreur.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  constructor(private http:HttpClient,private authService: AuthService){

  }

  
  
  //get all Livreurs
  tokenType = 'Bearer '; 
  getAllLivreurs(page:number, size: number):Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.get<any>(host + "/livreurs?page="+page+"&size="+size, {headers: headers});
  }

  //get enabled livreurs
  getEnabledLivreurs():Observable<any>{

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<Livreur[]>(host+"/livreurs/?statut=true", {headers: headers});
  }
 

  //search Livreur
  searchLivreur(keyWord:string):Observable<any>{

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<Livreur[]>(host+"/livreurs?nom_like="+keyWord, {headers: headers});
  }

  //delete Livreur
  deleteLivreur(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/livreurs/"+id, {headers: headers});
  }
  
  //save Tache
  saveLivreur(livreur:Livreur):Observable<Livreur>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<Livreur>(host+"/livreurs",livreur, {headers: headers});
  }

  //get livreur
  getLivreurs(id:number):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/livreurs/"+id, {headers: headers});
  }

  //update livreur
  updateLivreurs(id:number, livreur:Livreur):Observable<Livreur>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;

      return this.http.put<Livreur>(host+"/livreurs/"+id, livreur, {headers: headers});
  }

}
