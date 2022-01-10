import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeActionsNavBarComponent } from './groupe-actions-nav-bar.component';

describe('GroupeActionsNavBarComponent', () => {
  let component: GroupeActionsNavBarComponent;
  let fixture: ComponentFixture<GroupeActionsNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeActionsNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeActionsNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
