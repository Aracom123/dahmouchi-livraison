import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeActionsComponent } from './groupe-actions.component';

describe('GroupeActionsComponent', () => {
  let component: GroupeActionsComponent;
  let fixture: ComponentFixture<GroupeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
