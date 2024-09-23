import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(private userService: ApiService, private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      contactNo: [
        '', 
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(15)
        ]
      ],
      added_By: ['Admin'],
      updated_By: ['Admin']
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const newUser: User = this.addUserForm.value;
      this.userService.addUser(newUser).subscribe(
        (response) => {
          // Success scenario
          console.log('User added successfully!', response.message);
          this.snackBar.open('User added successfully!', 'Close', { duration: 3000 }); // Show success snackbar
          this.addUserForm.reset(); // Reset the form after successful submission
        },
        (error) => {
          // Error scenario
          this.snackBar.open('Error: ' + (error.error?.error || 'An unknown error occurred'), 'Close', { duration: 3000 }); // Show error snackbar
        }
      );
    } else {
      // Form is invalid scenario
      this.snackBar.open('Form is invalid. Please check the errors.', 'Close', { duration: 3000 }); // Show form validation error snackbar
    }
  }

  // openSnackBar method
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000, // Snackbar will be shown for 3 seconds
    });
  }

  get name() {
    return this.addUserForm.get('name');
  }

  get contactNo() {
    return this.addUserForm.get('contactNo');
  }

  get Added_By() {
    return this.addUserForm.get('Added_By');
  }

  get Updated_By() {
    return this.addUserForm.get('Updated_By');
  }
}
