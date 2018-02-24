import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './student';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  getListStudent(): Observable<Student[]> {
    const url = 'http://localhost:3000/students';
    return this.http.get<Student[]>(url);
  }
  getStudent(id): Observable<Student> {
    const url = 'http://localhost:3000/student/' + id;
    return this.http.get<Student>(url);
  }
  uploadImage(imageToUpload) {
    const input = new FormData();
    input.append('file', imageToUpload);
    const url = 'http://localhost:3000/uploadimage';
    return this.http.post(url, input);
  }
  editStudent(id, body) {
    console.log(id);
    console.log(body);
    const url = 'http://localhost:3000/student/' + id;
    return this.http.post(url, body, httpOptions);
  }
  addStudent(body) {
    const url = 'http://localhost:3000/student';
    return this.http.post(url, body, httpOptions);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  deleteStudent(id) {
    const url = 'http://localhost:3000/student/' + id;
    return this.http.delete<Student>(url, httpOptions).pipe(
      map(_ => console.log('delete ' + id)),
      catchError(this.handleError<any>('deleteStudent'))
    );
  }
}
