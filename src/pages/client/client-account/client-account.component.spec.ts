import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountComponent } from './client-account.component';

describe('ClientAccountComponent', () => {
  let component: ClientAccountComponent;
  let fixture: ComponentFixture<ClientAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAccountComponent]
    });
    fixture = TestBed.createComponent(ClientAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
