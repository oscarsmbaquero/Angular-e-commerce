import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlayComponent } from './card-play.component';

describe('CardPlayComponent', () => {
  let component: CardPlayComponent;
  let fixture: ComponentFixture<CardPlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPlayComponent]
    });
    fixture = TestBed.createComponent(CardPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
