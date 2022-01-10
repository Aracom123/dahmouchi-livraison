import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsNavBarComponent } from './actions-nav-bar.component';

describe('ActionsNavBarComponent', () => {
  let component: ActionsNavBarComponent;
  let fixture: ComponentFixture<ActionsNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
