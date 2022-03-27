import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReimbEmployeeComponent } from './reimb-employee/reimb-employee.component';
import { ReimbManagerComponent } from './reimb-manager/reimb-manager.component';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { RoleGuard } from './role.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { EmpDialogComponent } from './emp-dialog/emp-dialog.component';
import { ReceiptDialogComponent } from './receipt-dialog/receipt-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    ReimbEmployeeComponent,
    ReimbManagerComponent,
    EmpDialogComponent,
    ReceiptDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
