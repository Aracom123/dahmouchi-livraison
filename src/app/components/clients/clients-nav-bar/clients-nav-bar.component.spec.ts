import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsNavBarComponent } from './clients-nav-bar.component';

describe('ClientsNavBarComponent', () => {
  let component: ClientsNavBarComponent;
  let fixture: ComponentFixture<ClientsNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
