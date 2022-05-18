import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  p: number = 1;
  searchKey: any;
  searchRes: number = 0;
  searchResults$: Observable<any> = new Observable<any>();
  constructor(private movieService: MovieService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next:(data) => {
        this.searchResults$ = this.movieService.getMovieDetailsByKeyWord(data['key'])
        this.searchKey = data['key']
        this.searchResults$.subscribe({
          next: (response) => {
            console.log(response);
            this.searchRes=0
            if (response.length > 0) {
              this.searchRes++;
            }
            console.log(this.searchRes);
          }
        })
      }
    })
  }

  openPreview(event: any) {
    document.getElementById(event.target.children[1].id)!.style.display = "block"
  }

  closePreview(event: any) {
    document.getElementById(event.target.children[1].id)!.style.display = "none"
  }
}
