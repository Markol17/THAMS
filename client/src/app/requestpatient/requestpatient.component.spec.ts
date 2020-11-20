import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestpatientComponent } from './requestpatient.component';

describe('RequestpatientComponent', () => {
  let component: RequestpatientComponent;
  let fixture: ComponentFixture<RequestpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
