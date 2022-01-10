import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMatRoulantComponent } from './detail-mat-roulant.component';

describe('DetailMatRoulantComponent', () => {
  let component: DetailMatRoulantComponent;
  let fixture: ComponentFixture<DetailMatRoulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMatRoulantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMatRoulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
