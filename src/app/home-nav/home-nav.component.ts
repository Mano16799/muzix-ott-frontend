import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent implements OnInit, OnDestroy
{
  count!:number
  isLoggedIn:boolean=false
  userName:any
  constructor(private notify:NotificationService, private authService:AuthService) { 
    if(this.authService.isLoggedIn){
      this.isLoggedIn = true
      this.userName = this.authService.currentUser.firstName.split(" ")[0].toUpperCase()
    }
  }
  ngOnDestroy(): void {
    this.count=0
  }

  logOut(){
    this.authService.isLoggedIn = false
    this.authService.currentUser = {
      email:"",
      password:"",
      mobileNo:"",
      firstName:"",
      lastName:""
    }
    this.ngOnInit()
  }

  ngOnInit(): void {
    this.count = this.notify.count2
  }

  openNav() {
    document.getElementById("mySidenav")!.style.width = "250px";
    document.getElementById("outlet")!.style.opacity = "25%";
  }
  
  closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
    document.getElementById("outlet")!.style.opacity = "100%";
  }
}