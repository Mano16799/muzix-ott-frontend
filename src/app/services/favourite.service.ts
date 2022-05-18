import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  addMovieToFavourites(movieData: any) {
    let header = new HttpHeaders().set(
      "Authorization", "Bearer " + window.sessionStorage.getItem(this.authService.currentUser.email)
    )
    return this.httpClient.post<any>("http://localhost:9000/api/v2/movie-service/favourite", movieData, { headers: header });
  }

  deleteMovieFromFavourites(userEmail: any, movieId: any) {
    let header = new HttpHeaders().set(
      "Authorization", "Bearer " + window.sessionStorage.getItem(this.authService.currentUser.email)
    )
    return this.httpClient.delete<any>("http://localhost:9000/api/v2/movie-service/favourites/" + userEmail + "/" + movieId, { headers: header });
  }

  getAllfavourites(userEmail: any) {
    let header = new HttpHeaders().set(
      "Authorization", "Bearer " + window.sessionStorage.getItem(this.authService.currentUser.email)
    )
    return this.httpClient.get<any>("http://localhost:9000/api/v2/movie-service/favourites/" + userEmail, { headers: header });
  }

  deleteMovieFromFavouritesByEmail() {
    let header = new HttpHeaders().set(
      "Authorization", "Bearer " + window.sessionStorage.getItem(this.authService.currentUser.email)
    )
    return this.httpClient.delete<any>("http://localhost:9000/api/v2/movie-service/allFavourites/" + this.authService.currentUser.email, { headers: header });
  }

  getRecommendationsForUser() {
    let header = new HttpHeaders().set(
      "Authorization", "Bearer " + window.sessionStorage.getItem(this.authService.currentUser.email)
    )

    return this.httpClient.get<any>("http://localhost:9000/api/v2/movie-service/favourites/genres/" + this.authService.currentUser.email, { headers: header });
  }

}
