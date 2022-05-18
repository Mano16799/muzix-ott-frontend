import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  allMovies$!: Observable<any>
  p: number = 1;
  constructor(private favService: FavouriteService) {
    this.allMovies$ = this.favService.getRecommendationsForUser()
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
