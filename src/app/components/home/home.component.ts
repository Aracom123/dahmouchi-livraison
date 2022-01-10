import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  connected = true;
  
  navbar: boolean = false;

  isConnected$:Observable<boolean> = new Observable<boolean>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isConnected$ = this.authService.loggedIn; // {2}
  }

  isLoggedIn() {
    return !this.authService.isLoggedIn();
  }


}
