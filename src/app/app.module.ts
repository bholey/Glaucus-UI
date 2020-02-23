import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpconfigInterceptor } from './interceptor/httpconfig.interceptor';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesdialogueComponent } from './employees/CRUD/employeesdialogue/employeesdialogue.component';
import { SignupComponent } from './signup/signup.component';
import { RoleComponent } from './shared/role/role.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfimationOnDeleteComponent } from './employees/CRUD/confimation-on-delete/confimation-on-delete.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AmountDirectiveDirective } from './shared/directives/amount-directive.directive';
import { AlphabetDirectiveDirective } from './shared/directives/alphabet-directive.directive';


const appRoutes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'employees', component: EmployeesComponent},
  { path: 'signup', component: SignupComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    EmployeesdialogueComponent,
    SignupComponent,
    RoleComponent,
    ConfimationOnDeleteComponent,
    AmountDirectiveDirective,
    AlphabetDirectiveDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),

  ],
  entryComponents: [EmployeesdialogueComponent, ConfimationOnDeleteComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpconfigInterceptor, multi: true },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
