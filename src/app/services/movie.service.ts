import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  getAllMovies(){
    return this.http.get<any>("http://localhost:9000/api/v2/movies")
  }

  getMovieDetailById(id:any){
    return this.http.get<any>("http://localhost:9000/api/v2/movie/"+id)
  }

  getMovieDetailsByKeyWord(keyword:any){
    return this.http.get<any>("http://localhost:9000/api/v2/movies/search/"+keyword)
  }

  getMovieDetailsByKeyWordAndGenre(keyword:any,genre:any ){
    return this.http.get<any>("http://localhost:9000/api/v2/movies/"+keyword+"/"+genre)
  }

  getMoviesByGenre(genre:any){
    return this.http.get<any>("http://localhost:9000/api/v2/movies/"+genre)
  }

  getMovieTrailerDetailsById(id: any) {
    return this.http.get<any>("http://api.themoviedb.org/3/movie/" + id + "/videos?api_key=3a3fd3953e8bcec72806959156d314bd");
  }

  getTopMovies(){
    return this.http.get<any>("http://localhost:9000/api/v2/top-rated/")
  }
}
