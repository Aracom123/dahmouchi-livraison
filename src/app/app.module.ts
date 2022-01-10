import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { UpdateUsersComponent } from './components/users/update-users/update-users.component';
import { UsersNavBarComponent } from './components/users/users-nav-bar/users-nav-bar.component';
import { AddClientsComponent } from './components/clients/add-clients/add-clients.component';
import { UpdateClientsComponent } from './components/clients/update-clients/update-clients.component';
import { ListClientsComponent } from './components/clients/list-clients/list-clients.component';
import { ClientsNavBarComponent } from './components/clients/clients-nav-bar/clients-nav-bar.component';
import { ActionsComponent } from './components/actions/actions.component';
import { ActionsNavBarComponent } from './components/actions/actions-nav-bar/actions-nav-bar.component';
import { AddActionsComponent } from './components/actions/add-actions/add-actions.component';
import { ListActionsComponent } from './components/actions/list-actions/list-actions.component';
import { UpdateActionsComponent } from './components/actions/update-actions/update-actions.component';
import { GroupeActionsComponent } from './components/groupe-actions/groupe-actions.component';
import { AddGroupeActionsComponent } from './components/groupe-actions/add-groupe-actions/add-groupe-actions.component';
import { ListGroupeActionsComponent } from './components/groupe-actions/list-groupe-actions/list-groupe-actions.component';
import { UpdateGroupeActionsComponent } from './components/groupe-actions/update-groupe-actions/update-groupe-actions.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ServiceComponent } from './components/service/service.component';
import { DepenseComponent } from './components/depense/depense.component';
import { AddDepenseComponent } from './components/depense/add-depense/add-depense.component';
import { ListDepenseComponent } from './components/depense/list-depense/list-depense.component';
import { UpdateDepenseComponent } from './components/depense/update-depense/update-depense.component';
import { UpdateServiceComponent } from './components/service/update-service/update-service.component';
import { AddServiceComponent } from './components/service/add-service/add-service.component';
import { ListServiceComponent } from './components/service/list-service/list-service.component';
import { ListReglementComponent } from './components/reglement/list-reglement/list-reglement.component';
import { UpdateReglementComponent } from './components/reglement/update-reglement/update-reglement.component';
import { AddReglementComponent } from './components/reglement/add-reglement/add-reglement.component';

import { NgxPrintModule } from 'ngx-print';
//import { NgSelect2Module } from 'ng-select2';

import {DataTablesModule} from 'angular-datatables';
// Scanner
//import { ScanFolioCitaComponent } from './scan-folio-cita/scan-folio-cita.component';
//import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TestComponent } from './components/test/test.component';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { AutofocusDirective } from './directives/autofocus.directive';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgxPrinterModule } from 'ngx-printer';
import { MatRoulantComponent } from './components/mat-roulant/mat-roulant.component';
import { AddMatRoulantComponent } from './components/mat-roulant/add-mat-roulant/add-mat-roulant.component';
import { UpdateMatRoulantComponent } from './components/mat-roulant/update-mat-roulant/update-mat-roulant.component';
import { DetailMatRoulantComponent } from './components/mat-roulant/detail-mat-roulant/detail-mat-roulant.component';
import { LivreurComponent } from './components/livreur/livreur.component';
import { CompagnieComponent } from './components/compagnie/compagnie.component';
import { LivraisonComponent } from './components/livraison/livraison.component';
import { AddLivraisonComponent } from './components/livraison/add-livraison/add-livraison.component';
import { UpdateLivraisonComponent } from './components/livraison/update-livraison/update-livraison.component';
import { DetailLivraisonComponent } from './components/livraison/detail-livraison/detail-livraison.component';
//import { NgxPrinterModule } from 'ngx-print';
 
const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    TopBarComponent,
    SidebarComponent,
    UsersComponent,
    ClientsComponent,
    AddUsersComponent,
    ListUsersComponent,
    ProfileComponent,
    HomeComponent,
    UpdateUsersComponent,
    UsersNavBarComponent,
    AddClientsComponent,
    UpdateClientsComponent,
    ListClientsComponent,
    ClientsNavBarComponent,
    ActionsComponent,
    ActionsNavBarComponent,
    AddActionsComponent,
    ListActionsComponent,
    UpdateActionsComponent,
    GroupeActionsComponent,
    AddGroupeActionsComponent,
    ListGroupeActionsComponent,
    UpdateGroupeActionsComponent,
    ServiceComponent,
    DepenseComponent,
    AddDepenseComponent,
    ListDepenseComponent,
    UpdateDepenseComponent,
    UpdateServiceComponent,
    AddServiceComponent,
    ListServiceComponent,
    ListReglementComponent,
    UpdateReglementComponent,
    AddReglementComponent,
    TestComponent,
    AutofocusDirective,
    MatRoulantComponent,
    AddMatRoulantComponent,
    UpdateMatRoulantComponent,
    DetailMatRoulantComponent,
    LivreurComponent,
    CompagnieComponent,
    LivraisonComponent,
    AddLivraisonComponent,
    UpdateLivraisonComponent,
    DetailLivraisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    materialModules,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule,
    NgxPaginationModule,
    NgxPrintModule,
    DataTablesModule,
    BarcodeScannerLivestreamModule,
    Ng2SearchPipeModule,
    NgxPrinterModule.forRoot({printOpenWindow: false}),
    //NgxPrinterModule.forRoot({printOpenWindow: true}),
    //ZXingScannerModule,
    //NgSelect2Module,
  ],
  providers: [
    AuthService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
