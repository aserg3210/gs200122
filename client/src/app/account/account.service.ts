import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSourse = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSourse.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // getCurrentUserValue() {
  //   return this.currentUserSourse.value;
  // }
  loadCurrentUser(token: string) {
    if(token === null) {
      this.currentUserSourse.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'account', {headers})
      .pipe(
        map((user:IUser) => {
          if(user) {
            localStorage.setItem('token', user.token);
            this.currentUserSourse.next(user);
          }
        })
      );
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values)
      .pipe(
        map((user: IUser) => {
          if(user) {
            localStorage.setItem('token', user.token);
            this.currentUserSourse.next(user);
          }
        })
      );
  }
  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values)
      .pipe(
        map((user: IUser) => {
          if(user) {
            localStorage.setItem('token', user.token);
            this.currentUserSourse.next(user);
          }
        })
      );
  }
  logout() {
    localStorage.removeItem('token');
    this.currentUserSourse.next(null);
    this.router.navigateByUrl('/');
  }
  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }
  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

}
