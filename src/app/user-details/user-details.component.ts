import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { FavouriteService } from '../services/favourite.service';
import { NotificationService } from '../services/notification.service';
import { userDetails } from '../services/userDetails';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  disableEdit: boolean = true;
  canUpload: boolean = false

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  data: any;
  selectedFile: any;
  message: any;
  constructor(private authService: AuthService, private router: Router, private favService: FavouriteService,
    private notify: NotificationService) {

    this.registerForm = new FormGroup({
      email: new FormControl(this.authService.currentUser.email, [Validators.required, Validators.email]),
      password: new FormControl(this.authService.currentUser.password, [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl(this.authService.currentUser.firstName, Validators.required),
      lastName: new FormControl(this.authService.currentUser.lastName, Validators.required),
      mobileNo: new FormControl(this.authService.currentUser.mobileNo, [Validators.required])
    }
    );

  }
  ngOnDestroy(): void {
    this.disableEdit = true
    this.canUpload = false
  }

  ngOnInit(): void {
    this.authService.getUserDp(this.authService.currentUser.email).subscribe({
      next: (res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = this.base64Data;
      },
      error: (error) => {
        console.log(error);
      }
    }
    );
  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [Validators.required])
  }
  );

  get email() { return this.registerForm.controls['email']; }
  get password() { return this.registerForm.controls['password']; }
  get firstName() { return this.registerForm.controls['firstName']; }
  get lastName() { return this.registerForm.controls['lastName']; }
  get mobileNo() { return this.registerForm.controls['mobileNo']; }


  enableEdit() {
    this.disableEdit = false
    document.getElementById("floatingFNAME")!.style.backgroundColor = "white"
    document.getElementById("floatingFNAME")!.style.color = "black"
    document.getElementById("floatingLNAME")!.style.backgroundColor = "white"
    document.getElementById("floatingLNAME")!.style.color = "black"
    document.getElementById("floatingPhone")!.style.backgroundColor = "white"
    document.getElementById("floatingPhone")!.style.color = "black"
    document.getElementById("floatingPassword")!.style.backgroundColor = "white"
    document.getElementById("floatingPassword")!.style.color = "black"

    document.getElementById("floatingPasswordID")!.style.color = "black"
    document.getElementById("floatingFNAMEID")!.style.color = "black"
    document.getElementById("floatingLNAMEID")!.style.color = "black"
    document.getElementById("floatingPhoneID")!.style.color = "black"
  }

  changeInputFieldColorsToDefault() {
    document.getElementById("floatingFNAME")!.style.backgroundColor = "#3B3B3B"
    document.getElementById("floatingFNAME")!.style.color = "white"
    document.getElementById("floatingLNAME")!.style.backgroundColor = "#3B3B3B"
    document.getElementById("floatingLNAME")!.style.color = "white"
    document.getElementById("floatingPhone")!.style.backgroundColor = "#3B3B3B"
    document.getElementById("floatingPhone")!.style.color = "white"
    document.getElementById("floatingPassword")!.style.backgroundColor = "#3B3B3B"
    document.getElementById("floatingPassword")!.style.color = "white"

    document.getElementById("floatingPasswordID")!.style.color = "white"
    document.getElementById("floatingFNAMEID")!.style.color = "white"
    document.getElementById("floatingLNAMEID")!.style.color = "white"
    document.getElementById("floatingPhoneID")!.style.color = "white"
  }

  enableUpload() {
    this.canUpload = true;
  }

  update() {
    let data: userDetails = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      mobileNo: this.mobileNo.value
    }

    this.authService.updateUserDetails(data).subscribe({
      next: (data) => {
        Swal.fire('', 'Updated successfully', 'success');
        this.disableEdit = true
        this.changeInputFieldColorsToDefault()
        this.authService.currentUser = data
        this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
          this.router.navigate(["/home/user/"]);
      });
      },
      error: (error) => {
        Swal.fire('', 'Try Again Later', 'error');
      }
    })
  }
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  updateImage() {

    let uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.authService.currentUser.email);
    console.log(uploadImageData);
    //Make a call to the Spring Boot Application to save the image
    this.authService.updateUserDp(uploadImageData)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (response) => {
          if (response.status === 406) {
             Swal.fire('', 'Uploaded successfully', 'success');
          } else {
            Swal.fire('', 'please try again later', 'error');          }
        }
      }
      );
    this.canUpload = false
    setTimeout(() => this.ngOnInit(), 500)

  }

  deleteAccount() {
    Swal.fire({
      title: 'Are you sure want to delete account?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.deleteAccount().subscribe({
          next: (response: any) => {
            console.log(response);
            this.authService.deleteDp().subscribe();
            this.favService.deleteMovieFromFavouritesByEmail().subscribe();
            this.authService.isLoggedIn = false;
            Swal.fire('', 'Account Deleted Successfully', 'success');
            this.router.navigate(['/home']);
          },
          error: (response) => {
            console.log(response);
            Swal.fire('', 'please try again later', 'error');
          }
        }
        );
      } else if (result.isDenied) {
        Swal.fire('Account not deleted', '', 'info')
      }
    })

  }

}
