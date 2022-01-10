import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionEvent, MAGASINACTIONTYPES } from 'src/app/state/magasin.state';

@Component({
  selector: 'app-magasin-nav-bar',
  templateUrl: './magasin-nav-bar.component.html',
  styleUrls: ['./magasin-nav-bar.component.css']
})
export class MagasinNavBarComponent implements OnInit {

  @Output() magasinEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
 
  constructor() { }

  ngOnInit(): void {
  }
  onGetAllMagasins() {
    this.magasinEventEmitter.emit({type: MAGASINACTIONTYPES.GET_ALL_MAGASINS});
  }

  onGetEnabledMagasins() {
    this.magasinEventEmitter.emit({type: MAGASINACTIONTYPES.GET_AVAILABLE_MAGASINS});
  }

  onAddMagasin() {
    this.magasinEventEmitter.emit({type: MAGASINACTIONTYPES.NEW_MAGASIN});
  }

  onSearch(dataForm:any){
    this.magasinEventEmitter.emit({type: MAGASINACTIONTYPES.SEARCH_MAGASINS, payload: dataForm});
  }
}
