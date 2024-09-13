import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7164/api/Users'; 

  constructor(private http: HttpClient) { }
 public getUserList(pageNumber: number = 1, pageSize: number = 5): Observable<User[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<User[]>(`${this.apiUrl}/GetUsers`, { params });
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/GetUser`, { params: { id: id.toString() } });
  }

  public addUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/AddUser`, user);
  }

  public updateUser(user: User): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/UpdateUser`, user);
  }

  public deleteUser(user: User): Observable<string> {
    return this.http.request<string>('DELETE', `${this.apiUrl}/DeleteUser`, { body: user });
  }
}
