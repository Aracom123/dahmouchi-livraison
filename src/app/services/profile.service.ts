import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Profile } from "../models/profile.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }
  
  
  /**
     * ============= Pagination section 
     */
   getData(): Observable < any > {
    const url = "https://randomuser.me/api/?results=150";
    return this.http.get<any>(url);
    }
  
  getAll(params: any): Observable<any> {
      const baseUrl = "http://localhost:9191/api/produits";
      return this.http.get<any>(baseUrl, { params });
    }

  //get all Profiles
  tokenType = 'Bearer ';
  getAllProfiles():Observable<any>{
      //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      
      return this.http.get<any>(host + "/profiles", {headers: headers});
  }

  //search profile by keyword
  searchProfile(keyWord:string):Observable<any>{

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
      
    return this.http.get<Profile[]>(host+"/profiles?libelle_like="+keyWord, {headers: headers});
  }

  //delete Profile
  deleteProfile(id:number):Observable<void>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
      
    return this.http.delete<void>(host+"/profiles/"+id, {headers: headers});
  }
  
  //save Tache
  saveProfile(profile:Profile):Observable<Profile>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
      
    return this.http.post<Profile>(host+"/profiles", profile, {headers: headers});
  }

  //get Profile
  getProfiles(id:number):Observable<Profile>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
      
      return this.http.get<Profile>(host+"/profiles/"+id, {headers: headers});
  }

  //update Profile
  updateProfiles(profile:Profile):Observable<Profile>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
      
      return this.http.put<Profile>(host+"/profiles/"+profile.id_profile, profile, {headers: headers});
  }
}
