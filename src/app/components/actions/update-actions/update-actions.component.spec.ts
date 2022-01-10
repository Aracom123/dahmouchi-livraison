import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActionsComponent } from './update-actions.component';

describe('UpdateActionsComponent', () => {
  let component: UpdateActionsComponent;
  let fixture: ComponentFixture<UpdateActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
