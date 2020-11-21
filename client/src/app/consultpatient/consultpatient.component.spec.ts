import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultpatientComponent } from './consultpatient.component';

describe('ConsultpatientComponent', () => {
  let component: ConsultpatientComponent;
  let fixture: ComponentFixture<ConsultpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
