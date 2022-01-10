import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "../models/User.model";
import { AuthService } from "./auth.service";



@Injectable({providedIn: 'root'})
export class UsersService{



    constructor(private http:HttpClient,private authService: AuthService){

    }

    
    
    //get all Users
    tokenType = 'Bearer '; 
    getAllUsers():Observable<any>{
        //let host =(Math.random()>0.1)?environment.host:environment.unreachableHOST;
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
                
        return this.http.get<any>(host + "/mesUsers", {headers: headers});
    }

    //get enabled users
    getEnabledUsers():Observable<any>{

        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
        
        return this.http.get<User[]>(host+"/users/?statut=true", {headers: headers});
    }
   

    //search User
    searchUser(keyWord:string):Observable<any>{

        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
        
        return this.http.get<User[]>(host+"/users?nom_like="+keyWord, {headers: headers});
    }

    //delete User
    deleteUser(id:number):Observable<void>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
        
        return this.http.delete<void>(host+"/users/"+id, {headers: headers});
    }
    
    //save Tache
    saveUser(user:User):Observable<User>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
                
        return this.http.post<User>(host+"/utilisateurs",user, {headers: headers});
    }

    //get user
    getUsers(id:number):Observable<any>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;
        
        return this.http.get<any>(host+"/users/"+id, {headers: headers});
    }

    //update user
    updateUsers(id:number, user:User):Observable<User>{
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' +this.authService.getJwtToken()});
        let host = environment.host;

        return this.http.put<User>(host+"/users/"+id, user, {headers: headers});
    }

}