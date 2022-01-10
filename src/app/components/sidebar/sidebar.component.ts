import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isConnected$:Observable<boolean> = new Observable<boolean>();
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isConnected$ = this.authService.loggedIn; // {2}
  }

  isLoggedIn() {
    return !this.authService.isLoggedIn();
  }

  onLogout(){
    this.authService.logout(); 
    this.router.navigate(['/login']);                     // {3}
  }

}
