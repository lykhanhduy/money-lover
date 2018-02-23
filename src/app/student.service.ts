import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './student';
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
  deleteStudent(id) {
    const url = 'http://localhost:3000/student/' + id;
    return this.http.delete(url, httpOptions);
  }
}
