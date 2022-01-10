import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatRoulantComponent } from './add-mat-roulant.component';

describe('AddMatRoulantComponent', () => {
  let component: AddMatRoulantComponent;
  let fixture: ComponentFixture<AddMatRoulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMatRoulantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatRoulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
