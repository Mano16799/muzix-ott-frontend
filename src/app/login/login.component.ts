import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { userDetails } from '../services/userDetails';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get email() { return this.loginForm.controls['email']; }
  get password() { return this.loginForm.controls['password']; }

  login() {        
    let data: userDetails = {
      email: this.email.value,
      password: this.password.value,
      firstName: "",
      lastName: "",
      mobileNo: ""
    }

    this.authService.verifyUser(data).subscribe(
      {
        next: (response) => {
          Swal.fire('','Login Successful', 'success');
          this.authService.isLoggedIn = true
          let jwttoken = JSON.stringify(response.token.token);
          window.sessionStorage.setItem(data.email, jwttoken.substring(1, jwttoken.length - 1))
          this.authService.currentUser = response.user;
          this.router.navigate(['/home'])
        },
        error: (errorMesssage) => {
          Swal.fire('', 'Invalid credentials', 'error');
          console.log(errorMesssage);
        }
      }
    )
  }

}
