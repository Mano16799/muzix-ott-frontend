import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreMovieViewComponent } from './genre-movie-view.component';

describe('GenreMovieViewComponent', () => {
  let component: GenreMovieViewComponent;
  let fixture: ComponentFixture<GenreMovieViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreMovieViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreMovieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
