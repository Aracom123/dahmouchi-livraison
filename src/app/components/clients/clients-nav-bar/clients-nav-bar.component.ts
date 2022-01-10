import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionEvent, CLIENTACTIONTYPES } from 'src/app/state/client.state';

@Component({
  selector: 'app-clients-nav-bar',
  templateUrl: './clients-nav-bar.component.html',
  styleUrls: ['./clients-nav-bar.component.css']
})
export class ClientsNavBarComponent implements OnInit {

  @Output() clientEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
 
  constructor() { }

  ngOnInit(): void {
  }
  onGetAllClients() {
    this.clientEventEmitter.emit({type: CLIENTACTIONTYPES.GET_ALL_CLIENTS});
  }

  onGetEnabledClients() {
    this.clientEventEmitter.emit({type: CLIENTACTIONTYPES.GET_AVAILABLE_CLIENTS});
  }

  onAddClient() {
    this.clientEventEmitter.emit({type: CLIENTACTIONTYPES.NEW_CLIENT});
  }

  onSearch(dataForm:any){
    this.clientEventEmitter.emit({type: CLIENTACTIONTYPES.SEARCH_CLIENTS, payload: dataForm});
  }


}
