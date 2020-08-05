import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

interface AuthResponse
{
  status: string;
  success: string;
  token: string;
}

interface JWTResponse
{
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  tokenKey = 'JWT';
  isAuthenticated = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService)
  {
  }

  // tslint:disable-next-line:variable-name
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$()
  {
    return this._refreshNeeded$;
  }


  checkJWTtoken()
  {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
      .subscribe(res =>
      {
        this.sendUsername(res.user.username);
      },
        err =>
        {
          this.destroyUserCredentials();
        });
  }

  sendUsername(name: string)
  {
    this.username.next(name);
  }

  clearUsername()
  {
    this.username.next(undefined);
  }

  loadUserCredentials()
  {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    if (credentials && credentials.username !== undefined)
    {
      this.useCredentials(credentials);
      if (this.authToken)
      {
        this.checkJWTtoken();
      }
    }
  }

  storeUserCredentials(credentials: any)
  {
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any)
  {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  destroyUserCredentials()
  {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
    this.refreshNeeded$.next();
  }

  signUp(user: any): Observable<any>
  {
    return this.http.post<AuthResponse>(baseURL + 'users/signup',
      { username: user.username, firstname: user.firstname, lastname: user.lastname, password: user.password })
      .pipe(map(res =>
      {
        this.storeUserCredentials({ username: user.username, token: res.token });
        return { success: true, username: user.username };
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)))
      .pipe
      (
        tap(() => { this._refreshNeeded$.next(); })
      );
  }

  logIn(user: any): Observable<any>
  {
    return this.http.post<AuthResponse>(baseURL + 'users/login',
      { username: user.username, password: user.password })
      .pipe(map(res =>
      {
        this.storeUserCredentials({ username: user.username, token: res.token });
        return { success: true, username: user.username };
      }),
        catchError(error => this.processHTTPMsgService.handleError(error))).pipe
      (
        tap(() => { this._refreshNeeded$.next(); })
      );
  }

  logOut()
  {
    this.destroyUserCredentials();
  }

  isLoggedIn(): boolean
  {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string>
  {
    return this.username.asObservable();
  }

  getToken(): string
  {
    return this.authToken;
  }
}
