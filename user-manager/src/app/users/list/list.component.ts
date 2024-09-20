import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { UsersModule } from '../users.module';
import { ApiService } from '../../api.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


const ELEMENT_DATA: User[] = [
 
];

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, UsersModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [ApiService],
})

export class ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'contactNumber', 'actions']; // Adjusted the name 'contact Number' to be camelCase
  dataSource: User[] = [];  // Updated to User array for actual data
  

  constructor(private userService: ApiService,private router: Router) {}

  ngOnInit(): void {
    // Fetch the list of users on initialization
    this.userService.getUserList().subscribe(
      (users: User[]) => {
        this.dataSource = users;  // Set the data for the table
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe({
      next: (response) => {
        alert(response);  
        this.dataSource = this.dataSource.filter(u => u.id !== user.id);  // Remove the deleted user from the dataSource
      },
      error: (error) => {
        console.error('Error deleting user', error);
      }
    });
  }
  

  goToAdd() {
    debugger;
    this.router.navigate(['/add-user']);  // go to the 'add' component
  }

  ngOnDestroy(): void {
    
  }
}