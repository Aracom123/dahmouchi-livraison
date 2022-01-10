import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatRoulantComponent } from './update-mat-roulant.component';

describe('UpdateMatRoulantComponent', () => {
  let component: UpdateMatRoulantComponent;
  let fixture: ComponentFixture<UpdateMatRoulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMatRoulantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMatRoulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
