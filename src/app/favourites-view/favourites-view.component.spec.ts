import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesViewComponent } from './favourites-view.component';

describe('FavouritesViewComponent', () => {
  let component: FavouritesViewComponent;
  let fixture: ComponentFixture<FavouritesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
