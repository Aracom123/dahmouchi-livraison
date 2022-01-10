import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livraison } from '../models/livraison.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  constructor(private http:HttpClient,private authService: AuthService){

  }

  
  
  //get all Livraisons
  tokenType = 'Bearer '; 
  getAllLivraisons(page:number, size: number):Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.get<any>(host + "/mesLivraisons?page="+page+"&size="+size+"sort=idLivraison,desc", {headers: headers});
  }
    //Get Livraison par date de livraison
    getLivraisonsParDate(date: Date, page:number, size: number):Observable<any>{
        //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;                
        return this.http.get<any>(host + "/livraisons/search/parDate?dateLivraison="+date+"&page="+page+"&size="+size, {headers: headers});
    }

    //Get Livraison par livreur
    getLivraisonsParLivreur(idLivreur: number, page:number, size: number):Observable<any>{
        //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;                
        return this.http.get<any>(host + "/livraisons/search/parLivreur?idLivreur="+idLivreur+"&page="+page+"&size="+size, {headers: headers});
    }

    //Get Livraison par Livreur et date
    getLivraisonsParLivreurEtDate(idLivreur: number, date: Date, page:number, size: number):Observable<any>{
        //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;                
        return this.http.get<any>(host + "/livraisons/search/parLivreurEtDate?idLivreur="+idLivreur+"&dateLivraison="+date+"&page="+page+"&size="+size, {headers: headers});
    }

    //Get Livraison par livreur
    getLivraisonsParClient(idClient: number, page:number, size: number):Observable<any>{
        //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;                
        return this.http.get<any>(host + "/livraisons/search/parClient?idClient="+idClient+"&page="+page+"&size="+size, {headers: headers});
    }
    //Get Livraison par livreur
    getNombreLivraison():Observable<number>{
        //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;                
        return this.http.get<number>(host + "/livraisons/search/getNombreLivraison", {headers: headers});
    }

    //Get Livraison par livreur
    getTotalCA():Observable<number>{
        //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;                
        return this.http.get<number>(host + "/livraisons/search/getCATotal", {headers: headers});
    }

  //get enabled livraisons
  getEnabledLivraisons():Observable<any>{

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<Livraison[]>(host+"/livraisons/?statut=true", {headers: headers});
  }
 

  //search Livraison
  searchLivraison(keyWord:string):Observable<any>{

      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<Livraison[]>(host+"/livraisons?nom_like="+keyWord, {headers: headers});
  }

  //delete Livraison
  deleteLivraison(id:number):Observable<void>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.delete<void>(host+"/livraisons/"+id, {headers: headers});
  }
  
  //save Tache
  saveLivraison(livraison:Livraison):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
              
      return this.http.post<Livraison>(host+"/livraisons",livraison, {headers: headers});
  }

  //get livraison
  getLivraisons(id:number):Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host+"/mesLivraisons/"+id, {headers: headers});
  }

  //update livraison
  updateLivraisons(id:number, livraison:Livraison):Observable<Livraison>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;

      return this.http.put<Livraison>(host+"/livraisons/"+id, livraison, {headers: headers});
  }


}
