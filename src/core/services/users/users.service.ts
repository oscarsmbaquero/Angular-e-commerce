import { environment } from 'src/enviroment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../models/user-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})



export class UsersService {

  activeUser= '';
  
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$: Observable<IUser | null>;

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.activeUser = storedUser;
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // ngOnInit(){
  //   this.getOrderClient(this.activeUser);
  // }
  login(credentials: { user: string; password: string }): Observable<boolean> {
    console.log('Entro');
    const endpoint = `${environment.apiUrlMock}users/login`;
    return this.httpClient.post<IUser>(endpoint, credentials).pipe(
      map((user) => {
        if (user) {
          this.currentUserSubject.next(user);
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  register(credentials: { user: string; password: string }): Observable<boolean> {
    console.log('Entro');
    const endpoint = `${environment.apiUrlMock}users/register`;
    return this.httpClient.post<IUser>(endpoint, credentials).pipe(
      map((user) => {
        if (user) {
          this.currentUserSubject.next(user);
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: IUser) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearCurrentUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  getOrderClient(userId: string): Observable<any> {
    //return this.httpClient.get(`URL_DE_TU_API/pedidos/${userId}`);
    return this.httpClient.get<any[]>(`${environment.apiUrlMock}users/${userId}`);
  }
}
