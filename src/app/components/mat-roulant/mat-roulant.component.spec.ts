import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRoulantComponent } from './mat-roulant.component';

describe('MatRoulantComponent', () => {
  let component: MatRoulantComponent;
  let fixture: ComponentFixture<MatRoulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatRoulantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatRoulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
