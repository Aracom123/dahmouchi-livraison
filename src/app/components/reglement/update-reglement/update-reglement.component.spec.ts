import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReglementComponent } from './update-reglement.component';

describe('UpdateReglementComponent', () => {
  let component: UpdateReglementComponent;
  let fixture: ComponentFixture<UpdateReglementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReglementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
