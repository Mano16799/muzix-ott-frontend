import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { FavouritesViewComponent } from './favourites-view/favourites-view.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GenreMovieViewComponent } from './genre-movie-view/genre-movie-view.component';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { LoginComponent } from './login/login.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterComponent } from './register/register.component';
import { SearchViewComponent } from './search-view/search-view.component';
import { AuthGuard } from './services/auth.guard';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: "auth",
    component: AuthNavComponent,
    children: [{
      path: "login",
      component: LoginComponent
    },
    {
      path: "register",
      component: RegisterComponent
    },
    {
      path: "",
      redirectTo: "login",
      pathMatch: "full"
    }]
  },
  {
    path: "home",
    component: HomeNavComponent,
    children: [
      {
        path: "gallery",
        component: GalleryComponent
      },
      {
        path: "gallery/:genre",
        component: GenreMovieViewComponent
      },

      {
        path: "search/:key",
        component: SearchViewComponent
      },
      {
        path: "favourites",
        component: FavouritesViewComponent,
        canActivate: [(AuthGuard)]
      },
      {
        path: "",
        redirectTo: "gallery",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "home",
    component: HomeNavComponent,
    children: [{
      path: "movie/:id",
      component: MovieViewComponent
    }]
  }, {
    path: "home",
    component: HomeNavComponent,
    children: [
      {
        path: "notifications",
        component: NotificationComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: "home",
    component: HomeNavComponent,
    children: [
      {
        path: "user",
        component: UserDetailsComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
  , {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
