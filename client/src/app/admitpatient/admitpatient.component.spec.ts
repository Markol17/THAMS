import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitpatientComponent } from './admitpatient.component';

describe('AdmitpatientComponent', () => {
  let component: AdmitpatientComponent;
  let fixture: ComponentFixture<AdmitpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
