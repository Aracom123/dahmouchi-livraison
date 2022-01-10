import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionEvent, GROUPEACTIONACTIONTYPES } from 'src/app/state/groupe-action.state';

@Component({
  selector: 'app-groupe-actions-nav-bar',
  templateUrl: './groupe-actions-nav-bar.component.html',
  styleUrls: ['./groupe-actions-nav-bar.component.css']
})
export class GroupeActionsNavBarComponent implements OnInit {

  @Output() groupeActionEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
 
  constructor() { }

  ngOnInit(): void {
  }
  onGetAllGroupeActions() {
    this.groupeActionEventEmitter.emit({type: GROUPEACTIONACTIONTYPES.GET_ALL_GROUPE_ACTIONS});
  }

  onGetEnabledGroupeActions() {
    this.groupeActionEventEmitter.emit({type: GROUPEACTIONACTIONTYPES.GET_AVAILABLE_GROUPE_ACTIONS});
  }

  onAddGroupeAction() {
    this.groupeActionEventEmitter.emit({type: GROUPEACTIONACTIONTYPES.NEW_GROUPE_ACTION});
  }

  onSearch(dataForm:any){
    this.groupeActionEventEmitter.emit({type: GROUPEACTIONACTIONTYPES.SEARCH_GROUPE_ACTIONS, payload: dataForm});
  }
}
