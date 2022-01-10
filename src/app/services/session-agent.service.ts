import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionAgent } from '../models/session_agent.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionAgentService {

  constructor(private http:HttpClient, private authService: AuthService){

  }

  
  
  //get all Products
  tokenType = 'Bearer ';
  getAllSessionAgent(page: number, size: number):Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
      let host = environment.host;

      let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken()});
      
      return this.http.get<SessionAgent[]>(host+"/sessionAgents?page="+page+"&size="+size, {headers: headers});
  }

  /**
   * 
   * @param idm recuperer le stock d'un magasin
   * @returns 
   */

  getStockMagasin(id:number,page:number, size:number):Observable<any>{
    let host = "/api/sessionAgents/search/getStocks?idm=" + id+"&page="+page+"&size="+size;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<any>(host, {headers: headers});
  }

   /**
   * 
   * @param libelle produit recuperer le stock d'un magasin
   * @returns 
   */

    getStockByLibelleProduit(libelle:string,page:number, size:number):Observable<any>{
      let host = "/api/sessionAgents/search/getStocksByLibelleProduit?libelle=" + libelle+"&page="+page+"&size="+size;
      let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
      
      return this.http.get<any>(host, {headers: headers});
    }
  /**
   * 
   * @param idMagasin produit recuperer le stock d'un magasin
   * @param libelle produit recuperer le stock d'un magasin
   * @returns 
   */
  getStockByMagasinAndLibelleProduit(idMagasin: number, libelle:string): Observable<any>{
      let host = environment.host;
      let url = "/sessionAgents/search/parLibelleProduit?idmagasin=" + idMagasin +"&libelle="+ libelle;

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
     
      return this.http.get<any>(host+url, {headers: headers});
  }

  /**
   * verifier si le magasin a des produits en stock
   */
  isStockEmpty(idm: number) {
    let host = '/api/sessionAgents/search/isInStock?idmagasin=' + idm;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<number>(host, {headers: headers});
  }
 


  //search products
  searchSessionAgent(keyWord:string):Observable<any>{

    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<SessionAgent[]>(host+"/sessionAgents?libelle_like="+keyWord, {headers: headers});
  }

  //delete SessionAgent
  deleteSessionAgent(id:number):Observable<void>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.delete<void>(host+"/sessionAgents/"+id, {headers: headers});
  }
  
  //save Product
  saveSessionAgent(sa:SessionAgent):Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.post<SessionAgent>(host+"/sessionAgents",sa, {headers: headers});
  }

  //get SessionAgent
  getSessionAgents(id:number):Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get<any>(host+"/sessionAgents/"+id, {headers: headers});
  }

  //update SessionAgent
  updateStock(id:number, sa:SessionAgent):Observable<SessionAgent>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
  
    return this.http.put<SessionAgent>(host+"/sessionAgents/"+id, sa, {headers: headers});
  }

  //verifier si le produit existe dans le stock
  public existStock(idm:number, idp:number){
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get(host+ "/sessionAgents/search/quantiteProduit?idproduit="+idp+"&idmagasin="+idm, {headers: headers});
  }

  /**
 * Get Stock using idMagasin and idProduit as parameters
 */
  public getStock(idm:number, idp:number):Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
    return this.http.get("/api/sessionAgents/search/getStock?idp="+idp+"&idm="+idm, {headers: headers});
  }


}
