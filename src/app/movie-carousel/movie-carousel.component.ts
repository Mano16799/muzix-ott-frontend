import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css']
})
export class MovieCarouselComponent implements OnInit {

  topRatedMovies$: Observable<any> = new Observable<any>();
  topRatedMovies:any;
  constructor(private movieService: MovieService) {
    this.topRatedMovies$ = this.movieService.getTopMovies();
    this.topRatedMovies$.subscribe(
      (data)=>
      {
        this.topRatedMovies = data
        console.log(this.topRatedMovies);
        
      }
      
      
    )
  }

  ngOnInit(): void {
  }

}
