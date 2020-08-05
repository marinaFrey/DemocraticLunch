import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () =>
{
  let service: AuthService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });

  it('should define user as logged in after storing credentials', () =>
  {
    service.storeUserCredentials({ username: 'test', token: '1234'});
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should define user as not logged in if there is no token stored', () =>
  {
    expect(service.isLoggedIn()).toBeFalsy();
  });

  afterEach(() =>
  {
    service = null;
    localStorage.removeItem('token');
  });

});
