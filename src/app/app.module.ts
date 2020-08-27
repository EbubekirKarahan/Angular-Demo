import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { LoginComponent } from './employees/login.component';



import { SimpleService } from './services/simple.service';

import {  HttpModule } from '@angular/http';



import { DataTableModule } from './data-table';
import { DataTableDemo } from './demo-table/data-table-demo';


const appRoutes: Routes=[
  { path: 'list', component: ListEmployeesComponent },
  { path: 'login', component: LoginComponent  },
  { path: '', redirectTo: '/login', pathMatch:'full' },
  {path: '**', redirectTo: '/login'}
]


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    LoginComponent,
    DataTableDemo
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    DataTableModule
  ],
  providers: [SimpleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
