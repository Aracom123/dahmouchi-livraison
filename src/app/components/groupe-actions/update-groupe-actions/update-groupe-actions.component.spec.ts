import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupeActionsComponent } from './update-groupe-actions.component';

describe('UpdateGroupeActionsComponent', () => {
  let component: UpdateGroupeActionsComponent;
  let fixture: ComponentFixture<UpdateGroupeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGroupeActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGroupeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
