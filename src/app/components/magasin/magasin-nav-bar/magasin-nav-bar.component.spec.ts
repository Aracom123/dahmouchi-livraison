import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinNavBarComponent } from './magasin-nav-bar.component';

describe('MagasinNavBarComponent', () => {
  let component: MagasinNavBarComponent;
  let fixture: ComponentFixture<MagasinNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagasinNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagasinNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
