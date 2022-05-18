import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { GalleryComponent } from './gallery/gallery.component'
import {NgxPaginationModule} from 'ngx-pagination';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { GenreMovieViewComponent } from './genre-movie-view/genre-movie-view.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { YouTubePlayerModule} from '@angular/youtube-player';
import { SearchViewComponent } from './search-view/search-view.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NotificationComponent } from './notification/notification.component';
import { FavouritesViewComponent } from './favourites-view/favourites-view.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthNavComponent,
    HomeNavComponent,
    GalleryComponent,
    MovieCarouselComponent,
    GenreMovieViewComponent,
    MovieViewComponent,
    SearchViewComponent,
    UserDetailsComponent,
    NotificationComponent,
    FavouritesViewComponent,
    RecommendationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    NgxPaginationModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
