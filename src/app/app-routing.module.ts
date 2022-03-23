import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { RegisterComponent } from './register/register.component';
import { ReimbEmployeeComponent } from './reimb-employee/reimb-employee.component';
import { ReimbManagerComponent } from './reimb-manager/reimb-manager.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default path will be login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'reimb-manager',
    component: ReimbManagerComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 1 },
  },
  {
    path: 'reimb-employee',
    component: ReimbEmployeeComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 2 },
  },
  { path: 'forbidden', component: ForbiddenComponent },

  // wildcard path need to go last
  { path: '**', component: Page404Component }, // page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
