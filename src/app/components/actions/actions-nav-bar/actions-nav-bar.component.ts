import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ACTIONACTIONTYPES, ActionEvent } from 'src/app/state/action.state';

@Component({
  selector: 'app-actions-nav-bar',
  templateUrl: './actions-nav-bar.component.html',
  styleUrls: ['./actions-nav-bar.component.css']
})
export class ActionsNavBarComponent implements OnInit {

  @Output() actionEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
 
  constructor() { }

  ngOnInit(): void {
  }
  onGetAllActions() {
    this.actionEventEmitter.emit({type: ACTIONACTIONTYPES.GET_ALL_ACTIONS});
  }

  onGetEnabledActions() {
    this.actionEventEmitter.emit({type: ACTIONACTIONTYPES.GET_AVAILABLE_ACTIONS});
  }

  onAddAction() {
    this.actionEventEmitter.emit({type: ACTIONACTIONTYPES.NEW_ACTION});
  }

  onSearch(dataForm:any){
    this.actionEventEmitter.emit({type: ACTIONACTIONTYPES.SEARCH_ACTIONS, payload: dataForm});
  }

}
