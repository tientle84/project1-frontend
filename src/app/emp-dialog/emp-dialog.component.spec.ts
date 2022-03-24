import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDialogComponent } from './emp-dialog.component';

describe('EmpDialogComponent', () => {
  let component: EmpDialogComponent;
  let fixture: ComponentFixture<EmpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
