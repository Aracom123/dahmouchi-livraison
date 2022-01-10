import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  tokenType = 'Bearer ';
  
  getAllClients(page:number, size:number):Observable<any>{
    //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
    let host = environment.host;
    
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.get<any>(host + "/clients?page="+page+"&size="+size, {headers: headers});
  }

  //get enabled Clients
  getEnabledClients():Observable<any>{

    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<Client[]>(host+"/clients/?statut=true", {headers: headers});
  }
 

  //search Client
  searchClient(keyWord:string):Observable<any>{

      let host = environment.host;
      let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
      
      return this.http.get<Client[]>(host+"/clients?nom_like="+keyWord, {headers: headers});
  }

  //delete Client
  deleteClient(id:number):Observable<void>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.delete<void>(host+"/clients/"+id, {headers: headers});
  }
  
  //Get Livraison par livreur
  getNombreClient():Observable<number>{
    //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;                
    return this.http.get<number>(host + "/clients/search/getNombreClients", {headers: headers});
  }
  
  //save client method
  saveClient(client:Client):Observable<any>{
      let host = environment.host;
      let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
              
      return this.http.post<Client>(host+"/clients",client, {headers: headers});
  }

  //get Client
    getClients(id:number):Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.get<any>(host+"/clients/"+id, {headers: headers});
  }

  //update Client
  updateClients(id:number, client:Client):Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.put<Client>(host+"/clients/"+id, client, {headers: headers});
  }

  isClientExist(numero: number): Observable<number>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;                
        return this.http.get<any>(host + "/clients/search/countClient?numeroClient="+numero, {headers: headers});
  }
  getClientByNumero(numero: number): Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;                
        return this.http.get<any>(host + "/clients/search/parNumero?numeroClient="+numero, {headers: headers});
  }
}
