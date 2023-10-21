import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirComponent } from './anadir.component';

describe('AnadirComponent', () => {
  let component: AnadirComponent;
  let fixture: ComponentFixture<AnadirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnadirComponent]
    });
    fixture = TestBed.createComponent(AnadirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
