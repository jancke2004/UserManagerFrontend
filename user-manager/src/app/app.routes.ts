import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user.component';


export const routes: Routes = [
    { path: 'add-user', component: AddUserComponent },
    { path: '', redirectTo: '/add-user', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })


export class AppRoutingModule { }
