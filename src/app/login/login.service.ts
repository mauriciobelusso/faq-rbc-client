import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AccessToken } from './access.token';
import { environment } from '../../environments/environment';
import { Login } from '../model/login';

@Injectable()
export class LoginService implements CanActivate {

  userInfo: any;
  isAuthenticated = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
    this.isAuthenticated.next(true);
    return true;
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  hasRole(role: string): boolean {
    if (this.getUserInfo() && this.getUserInfo().authorities) {
      return this.getUserInfo().authorities.filter(
                e => e.authority === 'ROLE_' + role).length > 0;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']);
    //Object.keys(new AccessToken()).forEach(key => localStorage.removeItem(key));
  }

  login(username: string, password: string): Observable<AccessToken> {   
    const login = new Login();
    login.username = username;
    login.password = password;
    //console.log(login)
    return this.http.post<AccessToken>(`${environment.api}/auth`,
    login)
      .pipe(
        map(e => {
          Object.keys(e).forEach(key => localStorage.setItem(key, e[key]));
          this.isAuthenticated.next(true);
          return e;
        })
      );
  }

}
