import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionEvent, USERACTIONTYPES } from 'src/app/state/user.state';

@Component({
  selector: 'app-users-nav-bar',
  templateUrl: './users-nav-bar.component.html',
  styleUrls: ['./users-nav-bar.component.css']
})
export class UsersNavBarComponent implements OnInit {

  @Output() userEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllUsers() {
    this.userEventEmitter.emit({type: USERACTIONTYPES.GET_ALL_USERS});
  }

  onGetEnabledUsers() {
    this.userEventEmitter.emit({type: USERACTIONTYPES.GET_AVAILABLE_USERS});
  }

  onAddUser() {
    this.userEventEmitter.emit({type: USERACTIONTYPES.NEW_USER});
  }

  onSearch(dataForm:any){
    this.userEventEmitter.emit({type: USERACTIONTYPES.SEARCH_USERS, payload: dataForm});
  }
}
