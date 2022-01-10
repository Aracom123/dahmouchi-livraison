import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { AddActionsComponent } from './components/actions/add-actions/add-actions.component';
import { UpdateActionsComponent } from './components/actions/update-actions/update-actions.component';
import { AddClientsComponent } from './components/clients/add-clients/add-clients.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ListClientsComponent } from './components/clients/list-clients/list-clients.component';
import { UpdateClientsComponent } from './components/clients/update-clients/update-clients.component';
import { AddGroupeActionsComponent } from './components/groupe-actions/add-groupe-actions/add-groupe-actions.component';
import { GroupeActionsComponent } from './components/groupe-actions/groupe-actions.component';
import { ListGroupeActionsComponent } from './components/groupe-actions/list-groupe-actions/list-groupe-actions.component';
import { UpdateGroupeActionsComponent } from './components/groupe-actions/update-groupe-actions/update-groupe-actions.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ProfileComponentt } from './components/profile/profile.component';
import { UpdateUsersComponent } from './components/users/update-users/update-users.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ServiceComponent } from './components/service/service.component';
import { AddServiceComponent } from './components/service/add-service/add-service.component';
import { DepenseComponent } from './components/depense/depense.component';
import { AddDepenseComponent } from './components/depense/add-depense/add-depense.component';
import { TestComponent } from './components/test/test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatRoulantComponent } from './components/mat-roulant/mat-roulant.component';
import { LivreurComponent } from './components/livreur/livreur.component';
import { CompagnieComponent } from './components/compagnie/compagnie.component';
import { LivraisonComponent } from './components/livraison/livraison.component';
import { AddLivraisonComponent } from './components/livraison/add-livraison/add-livraison.component';
import { UpdateLivraisonComponent } from './components/livraison/update-livraison/update-livraison.component';
import { DetailLivraisonComponent } from './components/livraison/detail-livraison/detail-livraison.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: "pagination", component: ProfileComponentt },
  
  { path: "login", component:LoginComponent},
  { path: "profiles", component: ProfileComponent, canActivate: [AuthGuard]},
  { path: "test", component: TestComponent, canActivate: [AuthGuard]},  
  { 
    path: "admin", 
    component: HomeComponent, 
    children : [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},

      { path: "mat-roulants", component: MatRoulantComponent, canActivate: [AuthGuard]},

      { path: "livreurs", component: LivreurComponent, canActivate: [AuthGuard]},

      { path: "compagnies", component: CompagnieComponent, canActivate: [AuthGuard]},

      { path: "users", component:UsersComponent, canActivate: [AuthGuard]},
      { path: "add-users", component:AddUsersComponent, canActivate: [AuthGuard]},
      { path: "update-users/:url", component:UpdateUsersComponent, canActivate: [AuthGuard]},
      { path: "list-users/:url", component: ListUsersComponent, canActivate: [AuthGuard]},
  

      { path: "livraisons", component:LivraisonComponent, canActivate: [AuthGuard]},
      { path: "add-livraison", component:AddLivraisonComponent, canActivate: [AuthGuard]},
      { path: "update-livraison/:url", component:UpdateLivraisonComponent, canActivate: [AuthGuard]},
      { path: "list-livraison/:url", component: DetailLivraisonComponent, canActivate: [AuthGuard]},
    
      { path: "clients", component: ClientsComponent, canActivate: [AuthGuard]},
      { path: "add-clients", component: AddClientsComponent, canActivate: [AuthGuard]},
      { path: "update-clients/:url", component: UpdateClientsComponent, canActivate: [AuthGuard]},
      { path: "list-clients/:url", component: ListClientsComponent, canActivate: [AuthGuard]},
            
      { path: "actions", component: ActionsComponent, canActivate: [AuthGuard]},
      { path: "add-actions", component:AddActionsComponent, canActivate: [AuthGuard]},
      { path: "update-actions/:url", component:UpdateActionsComponent, canActivate: [AuthGuard]},
      { path: "list-actions/:url", component: ListGroupeActionsComponent, canActivate: [AuthGuard] },
      
      { path: "groupe-actions", component: GroupeActionsComponent, canActivate: [AuthGuard]},
      { path: "add-groupe-actions", component:AddGroupeActionsComponent, canActivate: [AuthGuard]},
      { path: "update-groupe-actions/:url", component:UpdateGroupeActionsComponent, canActivate: [AuthGuard]},
      { path: "list-groupe-actions/:url", component:ListGroupeActionsComponent, canActivate: [AuthGuard]},
      
      
      { path: "services", component: ServiceComponent, canActivate: [AuthGuard]},
      { path: "add-services", component:AddServiceComponent, canActivate: [AuthGuard]},


      { path: "depenses", component: DepenseComponent, canActivate: [AuthGuard]},
      { path: "add-depenses", component: AddDepenseComponent, canActivate: [AuthGuard] },
      
    ],
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
