import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications: any=[]
  constructor(private notify: NotificationService, private router:Router) {
    this.notifications = this.notify.allFAvourites
    if(this.notifications.length==0){
      Swal.fire('', 'You have no new notifications', 'info')
      this.router.navigate(["home"])
    }
  }
  ngOnDestroy(): void {
    this.notify.allFAvourites = []
    this.notify.count2=0
  }

  ngOnInit(): void {
  }

}
