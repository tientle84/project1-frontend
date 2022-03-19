import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbEmployeeComponent } from './reimb-employee.component';

describe('ReimbEmployeeComponent', () => {
  let component: ReimbEmployeeComponent;
  let fixture: ComponentFixture<ReimbEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimbEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
