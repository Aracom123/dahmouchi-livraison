import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupeActionsComponent } from './add-groupe-actions.component';

describe('AddGroupeActionsComponent', () => {
  let component: AddGroupeActionsComponent;
  let fixture: ComponentFixture<AddGroupeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupeActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
