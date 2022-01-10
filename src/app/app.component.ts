import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//declare let $: any;


export class AppComponent implements OnInit {
  
  title = 'Ara livraison';
  connected = true;
  
  isConnected = this.isLoggedIn();
  
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    console.log("INIT APP" + this.isConnected)
        //$('.js-example-basic-single').select2();
  }

  isLoggedIn() {
    return !this.authService.isLoggedIn();
  }

}
