import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdmitpatientComponent } from './admitpatient.component';

describe('AdmitpatientComponent', () => {
  let component: AdmitpatientComponent;
  let fixture: ComponentFixture<AdmitpatientComponent>;

  beforeEach(waitForAsync(() => {
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
