import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { userDetails } from '../services/userDetails';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [Validators.required])
  }
  );

  get email() { return this.registerForm.controls['email']; }
  get password() { return this.registerForm.controls['password']; }
  get confirmPassword() { return this.registerForm.controls['confirmPassword']; }
  get firstName() { return this.registerForm.controls['firstName']; }
  get lastName() { return this.registerForm.controls['lastName']; }
  get mobileNo() { return this.registerForm.controls['mobileNo']; }

  register() {

    if (this.password.value === this.confirmPassword.value) {
      let data: userDetails = {
        email: this.email.value,
        password: this.password.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        mobileNo: this.mobileNo.value
      }

      this.authService.register(data).subscribe({
        next: (response) => {
          Swal.fire('', 'Registration Successful', 'success');
          this.router.navigate(["/auth/login"])
          console.log(response);
        },
        error: (errorMessage) => {
          if(errorMessage.error==="User already exists")
          Swal.fire('',"You have an account already.. Please login!!",'error');
          else
          Swal.fire('', 'Registration un-successful', 'error');
          console.log(errorMessage);
        }
      })
    }
    else {
      Swal.fire('', 'Password and Confirm-password field(s) should be same', 'error');
    }

  }
}
