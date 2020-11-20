import { TestBed } from '@angular/core/testing';

import { AdmissionserviceService } from './admissionservice.service';

describe('AdmissionserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmissionserviceService = TestBed.get(AdmissionserviceService);
    expect(service).toBeTruthy();
  });
});
