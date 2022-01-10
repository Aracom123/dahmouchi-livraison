import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupeActionsComponent } from './list-groupe-actions.component';

describe('ListGroupeActionsComponent', () => {
  let component: ListGroupeActionsComponent;
  let fixture: ComponentFixture<ListGroupeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGroupeActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
