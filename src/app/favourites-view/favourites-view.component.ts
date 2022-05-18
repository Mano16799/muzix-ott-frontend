import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FavouriteService } from '../services/favourite.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favourites-view',
  templateUrl: './favourites-view.component.html',
  styleUrls: ['./favourites-view.component.css']
})

export class FavouritesViewComponent implements OnInit {

  favouritesList$!: Observable<any>
  p: number = 1;
  constructor(private favService: FavouriteService, private authService:AuthService, private router:Router) {
   
  }
  ngOnInit(): void {
    this.favouritesList$ = this.favService.getAllfavourites(this.authService.currentUser.email);
    this.favouritesList$.subscribe(data=>{
      if(data.length==0){
        Swal.fire('','No favourites in the list','info')
        this.router.navigate(['/home'])
      }
    }
    )
  }

  openPreview(event: any) {    
    document.getElementById(event.target.children[2].id)!.style.display = "block"
  }
  closePreview(event: any) {
    document.getElementById(event.target.children[2].id)!.style.display = "none"
  }

  deleteMovie(movieId: any) {

    this.favService.deleteMovieFromFavourites(this.authService.currentUser.email, movieId).subscribe({
      next: () => {
        Swal.fire('', 'Deletion Successful', 'success');
        this.ngOnInit()
      },
      error: () => {
        Swal.fire('', 'Deletion un-successful. Try again later', 'error');
      }
    });
  }
}
