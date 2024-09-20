import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent  } from './list/list.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user.component';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    ListComponent 
  ],
  exports: [
    AddUserComponent,
    ListComponent 
  ]
})
export class UsersModule {}