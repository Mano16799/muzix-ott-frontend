import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  count2:number = 0
  // private count:any=new BehaviorSubject(this.count2)
  // getCount$:any = this.count.asObservable();
  // getCount$:Observable<any>=new Observable((subscriber)=>{
  //   subscriber.next(this.count2)
  // })

  allFAvourites:any=[]
}
