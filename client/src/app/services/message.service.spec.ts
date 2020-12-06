import { TestBed } from '@angular/core/testing';

import { CustomMessageService } from './message.service';

describe('MessageService', () => {
  let service: CustomMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
