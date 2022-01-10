import { Component, ViewChild, OnInit  } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponentt implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // @ViewChild(MatPaginator) paginator: any; //real type --> MatPaginator
  // @ViewChild(MatSort) sort?: MatSort;

  // ngOnInit() {
  //   this.dataSource.paginator = this.paginator;
  //   //setTimeout(() => this.dataSource.paginator = this.paginator);
    
  // }

  ngOnInit(){}
  // /**
  //  * ---------------------------------------------
  //  */
  // donnees?:any [];
  // totalRecords?: Number;
  // page?: Number = 1;
  // constructor(private profileService: ProfileService) { this.donnees = [];}

  // getUsers() {
  //   this.profileService.getData().subscribe(data => {
      
  //     this.donnees = data.results;
  //     this.totalRecords = data.results.length;
  //     console.log(this.donnees);
  //     console.log(this.totalRecords);
  //   });
  // }
}

/* Static data */ 

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
