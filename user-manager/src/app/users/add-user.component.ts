import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(private userService: ApiService, private fb: FormBuilder) {}

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
        response => {
          console.log('User added successfully!', response);
          alert('User added successfully!');
          this.addUserForm.reset(); // Reset the form after successful submission
        },
        error => {
          debugger;
          console.error('Error adding user', error);
          alert('Error: ' + error.message);
        }
      );
    } else {
      alert('Form is invalid. Please check the errors.');
    }
  }

  get name() {
    return this.addUserForm.get('name');
  }

  get contactNo() {
    return this.addUserForm.get('contactNo');
  }

  get addedBy() {
    return this.addUserForm.get('addedBy');
  }

  get updatedBy() {
    return this.addUserForm.get('updatedBy');
  }
}
