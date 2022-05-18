import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FavouriteService } from '../services/favourite.service';
import { MovieService } from '../services/movie.service';
import Swal from 'sweetalert2';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit {
  isLoggedIn: boolean = false
  currentMovie:any
  constructor(private route: ActivatedRoute, private movieService: MovieService, private favService: FavouriteService,
    private authService: AuthService, private notificationServ:NotificationService, private router:Router) {
    this.route.params.subscribe(data => {
      this.posterDetails$ = this.movieService.getMovieTrailerDetailsById(data['id']);
      this.movieDetails$ = this.movieService.getMovieDetailById(data['id'])
      this.movieDetails$.subscribe(data => console.log(data)
      )
      this.currentMovie = data['id']
    })
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    if (this.authService.isLoggedIn) {
      this.isLoggedIn = true
    }
  }

  ngOnInit(): void {

  }
  posterDetails$: Observable<any> = new Observable<any>();
  movieDetails$: Observable<any> = new Observable<any>();
  apiLoaded: boolean = false;

  addToFavourites(movie: any) {
    let fav: any = {
      id: null,
      email: this.authService.currentUser.email,
      favourite: movie
    }
    let count = 0;
    this.favService.getAllfavourites(fav.email).subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (movie.title == element.favourite.title) {
          count++;
        }
      }
      if (count == 0) {
        this.favService.addMovieToFavourites(fav).subscribe(() => {
          Swal.fire('', 'Movie added to favourites', 'success');
          this.notificationServ.allFAvourites.push(fav)
          this.notificationServ.count2++;
          //study the working of below code
          this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
            this.router.navigate(["/home/movie/"+this.currentMovie]);
        });
        })
      }
      else {
        Swal.fire('', 'Already added to favourites', 'error')
      }
    })
  }
}
