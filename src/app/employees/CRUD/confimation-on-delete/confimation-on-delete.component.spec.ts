import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimationOnDeleteComponent } from './confimation-on-delete.component';

describe('ConfimationOnDeleteComponent', () => {
  let component: ConfimationOnDeleteComponent;
  let fixture: ComponentFixture<ConfimationOnDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfimationOnDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimationOnDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
