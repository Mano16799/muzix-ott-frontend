import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userDetails } from './userDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  authToken: any;
  currentUser!: userDetails

  constructor(private http: HttpClient) { }

  verifyUser(user: userDetails) {
    return this.http.post<any>("http://localhost:9000/api/v2/login", user)
  }

  register(user: userDetails) {
    return this.http.post<any>("http://localhost:9000/api/v2/register", user)
  }

  updateUserDetails(user: userDetails) {
    let header = new HttpHeaders().set(
      "Authorization", "Bearer " + window.sessionStorage.getItem(this.currentUser.email)
    )
    return this.http.put<any>("http://localhost:9000/api/v2/movie-service/update", user, { headers: header })
  }

  getUserDp(email: any) {
    return this.http.get<any>("http://localhost:9000/api/v1/get/" + email)
  }

  updateUserDp(uploadImageData: any) {
    return this.http.post('http://localhost:9000/api/v2/upload', uploadImageData)
  }

  deleteAccount() {
    let header = new HttpHeaders().set(
      "Authorization", "Bearer " + window.sessionStorage.getItem(this.currentUser.email)
    )
    return this.http.delete("http://localhost:9000/api/v2/movie-service/user/" + this.currentUser.email, { headers: header });
  }
  deleteDp() {
    let header = new HttpHeaders().set(
      "Authorization", "Bearer " + window.sessionStorage.getItem(this.currentUser.email)
    )
    return this.http.delete("http://localhost:9000/api/v2/movie-service/deleteImage/" + this.currentUser.email, { headers: header });
  }
}
