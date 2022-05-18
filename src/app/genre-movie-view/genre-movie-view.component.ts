import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-genre-movie-view',
  templateUrl: './genre-movie-view.component.html',
  styleUrls: ['./genre-movie-view.component.css']
})
export class GenreMovieViewComponent implements OnInit {

  allMovies$!: Observable<any>
  p: number = 1;
  selectedGenre:any
  constructor(private movieService: MovieService, private route: ActivatedRoute) {
    this.route.params.subscribe(data => {
      this.selectedGenre = data['genre']
      this.allMovies$ = this.movieService.getMoviesByGenre(data['genre'])
      console.log(this.allMovies$.subscribe(data => console.log(data)
      ));

    })
  }

  ngOnInit(): void {
  }
  openPreview(event: any) {
    document.getElementById(event.target.children[1].id)!.style.display = "block"
  }

  closePreview(event: any) {
    document.getElementById(event.target.children[1].id)!.style.display = "none"
  }

}
