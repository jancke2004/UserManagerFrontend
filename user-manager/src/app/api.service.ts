import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, empty, Observable, throwError } from 'rxjs';
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
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<User>(`${this.apiUrl}/GetUser`, { params: { id: id.toString() } });
  }

  public addUser(user: User): Observable<any> {
    debugger;
    return this.http.post<any>(`${this.apiUrl}/AddUser`, user).pipe(
      catchError(this.handleError)
    );
  }
  
  

  public updateUser(user: User): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/UpdateUser`, user);
  }

  public deleteUser(user: User): Observable<string> {
    return this.http.request<string>('DELETE', `${this.apiUrl}/DeleteUser`, { body: user });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an error response
      errorMessage = `Error ${error.status}: ${error.error?.error || 'Server error'}`;
    }
    return throwError(() => new Error(errorMessage));
  }
  
}
