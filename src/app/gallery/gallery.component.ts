import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  isLoggedIn:boolean=false
  allMovies$!: Observable<any>
  p: number = 1;
  constructor(private movieService: MovieService, private authServ:AuthService) {
    this.allMovies$ = this.movieService.getAllMovies()
    this.isLoggedIn =this.authServ.isLoggedIn
  }


  ngOnInit(): void {
  }

  openPreview(event:any){
    document.getElementById(event.target.children[1].id)!.style.display="block"
  }

  closePreview(event:any){
    document.getElementById(event.target.children[1].id)!.style.display="none"
  }
}
