import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Achat } from '../models/achat.model';
import { ListProduitAchat } from '../models/liste_produits_achat.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  tokenType = 'Bearer ';
  
  getAllAchats(page:number, size:number):Observable<any>{
      
      let host = environment.host;
      let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
      // const header = new HttpHeaders({ 'authorization': this.tokenType +this.authService.getJwtToken(), 'responseType': 'json' });
      
      return this.http.get<any>(host + "/achats?page="+page+"&size="+size+"&sort=idAchat,desc", { headers: headers });
  }

  getAllAchatsParFournisseur(idFournisseur: number, page:number, size:number):Observable<any>{
      
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    // const header = new HttpHeaders({ 'authorization': this.tokenType +this.authService.getJwtToken(), 'responseType': 'json' });
    
    return this.http.get<any>(host + "/achats/search/parFournisseur?idFournisseur="+idFournisseur+"&page="+page+"&size="+size+"&sort=idAchat,desc", { headers: headers });
  }

  getAllAchatsParDate(dateAchat: Date, page:number, size:number):Observable<any>{
      
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    // const header = new HttpHeaders({ 'authorization': this.tokenType +this.authService.getJwtToken(), 'responseType': 'json' });
    
    return this.http.get<any>(host + "/achats/search/parDate?dateAchat="+dateAchat+"&page="+page+"&size="+size+"&sort=idAchat,desc", { headers: headers });
  }

  getTotalAchat():Observable<any>{
      
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    // const header = new HttpHeaders({ 'authorization': this.tokenType +this.authService.getJwtToken(), 'responseType': 'json' });
    
    return this.http.get<any>(host + "/achats/search/totalAchat", { headers: headers });
  }

  getAllAchatsParFournisseurEtDate(idFournisseur: number, dateAchat: Date, page:number, size:number):Observable<any>{
      
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    // const header = new HttpHeaders({ 'authorization': this.tokenType +this.authService.getJwtToken(), 'responseType': 'json' });
    
    return this.http.get<any>(host + "/achats/search/parFournissseurEtDate?idFournisseur="+idFournisseur+ "&dateAchat="+dateAchat+ "&page="+page+"&size="+size+"&sort=idAchat,desc", { headers: headers });
  }

  //get enabled achats
  getEnabledAchats():Observable<any>{

      let host = environment.host;
      let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
      
      
      return this.http.get<Achat[]>(host+"/achats/?statut=true", { headers: headers });
  }
 

  //search Achat
  searchAchat(keyWord:string):Observable<any>{

      let host = environment.host;
      let headers = new HttpHeaders().set('Authorization',this.tokenType + this.authService.getJwtToken())
      
      
      return this.http.get<Achat[]>(host+"/achats?nom_like="+keyWord, { headers: headers });
  }

  //delete Achat
  deleteAchat(id:number):Observable<void>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.delete<void>(host+"/achats/"+id, {headers: headers});
}
  
  //save Achat method
  saveAchat(achat:Achat):Observable<Achat>{
      let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType + this.authService.getJwtToken() });
    
      //achat.liste_produits_achat;
      return this.http.post<Achat>(host+"/achats", achat, {headers: headers});
  }

  //get Achat
    getAchats(id:number):Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.get<any>(host+"/achats/"+id, {headers: headers});
  }

  //update Achat
  updateAchats(id:number, achat:Achat):Observable<Achat>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
    
    return this.http.put<Achat>(host+"/achats/"+id, achat,{headers: headers});
  }

  /**
   *  ===================         liste produits achats  Services     ===================================
   */

   getAllListeProduitsAchats(page:number, size:number):Observable<any>{
       //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
       let host = environment.host;
       
       let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
       
       
       return this.http.get<any>(host + "/listeProduitsAchats?page="+page+"&size="+size, {headers: headers});
   }

   /**
   *  ===================         liste produits achats  Services     ===================================
   */

    getMontantAchat(idAchat:number):Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
      // let host = environment.host;
      
      let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
      
      let host = environment.host;

      return this.http.get<any>(host + "/listeProduitsAchats/search/getMontantAchat?idAchat=" + idAchat, {headers: headers});
  }
 
   //get enabled liste-produits-achats
   getEnabledListeProduitsAchats():Observable<any>{
 
       let host = environment.host;
       let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
       
       return this.http.get<ListProduitAchat[]>(host+"/listeProduitsAchats/?statut=true", {headers: headers});
   }
  
 
   //search liste-produits-achats
   searchListeProduitsAchat(keyWord:string):Observable<any>{
 
       let host = environment.host;
       let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
       
       return this.http.get<ListProduitAchat[]>(host+"/listeProduitsAchats?nom_like="+keyWord, {headers: headers});
   }
 
   //delete ListeProduitsAchat
   deleteListeProduitsAchat(id:number):Observable<void>{
     let host = environment.host;
     let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
     
     return this.http.delete<void>(host+"/listeProduitsAchats/"+id, {headers: headers});
 }
   
   //save ListeProduitsAchat method
   saveListeProduitsAchat(lAchat:ListProduitAchat):Observable<ListProduitAchat>{
       let host = environment.host;
       let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
               
       return this.http.post<ListProduitAchat>(host+"/listeProduitsAchats",lAchat, {headers: headers});
   }
 
   //get ListeProduitsAchat
     getListeProduitsAchat(id:number):Observable<any>{
     let host = environment.host;
     let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
     
     return this.http.get<any>(host+"/listeProduitsAchats/"+id, {headers: headers});
   }
 
   //update ListeProduitsAchat
   updateListeProduitsAchats(id:number, lAchat:ListProduitAchat):Observable<ListProduitAchat>{
     let host = environment.host;
     let headers = new HttpHeaders({ 'Authorization': this.tokenType +this.authService.getJwtToken()});
     
     return this.http.put<ListProduitAchat>(host+"/listeProduitsAchats/"+id, lAchat, {headers: headers});
   }
}
