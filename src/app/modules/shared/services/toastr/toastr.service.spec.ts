import { TestBed } from '@angular/core/testing';

import { ToastrService } from './toastr.service';

describe('ToasterService', () => {
  let service: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
