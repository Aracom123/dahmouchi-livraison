import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) { }
  
  public generateToken(request) {
    return this.http.post("http://localhost:9090/authenticate", request, { responseType: 'text' as 'json' });
  }

  public welcome(token) {
    let tokenStr = 'bearer ' + token;
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://localhost:9090/", {headers ,responseType: 'text' as 'json' });
  }
}
