import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesdialogueComponent } from './employeesdialogue.component';

describe('EmployeesdialogueComponent', () => {
  let component: EmployeesdialogueComponent;
  let fixture: ComponentFixture<EmployeesdialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesdialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesdialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
