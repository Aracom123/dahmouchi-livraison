import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaterielRoulant } from '../models/mat-roulant.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MatRoulantService {
  //get all MaterielsRoulants
  tokenType = 'Bearer ';

  constructor(private http:HttpClient, private authService:AuthService) { }

  /**
   * Get all materiels roulants
   * @param page 
   * @param size 
   * @returns 
   */
  getAllMatRoulants(page:number, size:number):Observable<any>{
    let host = environment.host;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    return this.http.get<MaterielRoulant[]>(host+"/materielRoulants?page="+page+"&size="+size+"&sort=idProduit,desc", {headers: headers});
  }

   /**
   * Get single materiel Roulant
   * @param id 
   * @returns 
   */
    getMaterielRoulant(id: number): Observable<any>{
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
      let host = environment.host;
      return this.http.get<any>(host+"/materielRoulants/"+id, {headers: headers});
    }

  /**
   * Save matériel Roulant
   * @param mr 
   * @returns 
   */
  saveMaterielsRoulant(mr: MaterielRoulant): Observable<MaterielRoulant>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    return this.http.post<MaterielRoulant>(host+"/materielRoulants",mr ,{headers: headers});
  }

  /**
   * update materiels roulant
   * @param mr 
   * @returns 
   */
  updateMaterielsRoulant(id: number, mr: MaterielRoulant): Observable<MaterielRoulant>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    return this.http.put<MaterielRoulant>(host+"/materielRoulants/"+id, mr ,{headers: headers});
  }

  /**
   * Get single materiel Roulant
   * @param id 
   * @returns 
   */
   deleteMaterielRoulant(id: number): Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
    let host = environment.host;
    return this.http.delete<any>(host+"/materielRoulants/"+id, {headers: headers});
  }
}
