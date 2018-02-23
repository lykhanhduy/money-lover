import { StudentService } from './../../student.service';
import { Student } from './../../student';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  constructor(private http: HttpClient, private studentService: StudentService,
  private flashMassageService: FlashMessagesService,
  private _route: Router) {}

  ngOnInit() {

  }
  onSubmit(formAddStudent) {
    const newStudent = formAddStudent.value;
    const fi = this.fileInput.nativeElement;

    if (fi.files[0]) {
      newStudent.anhdaidien = fi.files[0].name;
      this.studentService.uploadImage(fi.files[0])
      .subscribe(res => console.log(res));
    }
    this.studentService.addStudent(newStudent)
    .subscribe(res => {
      this._route.navigate(['/list-student']);
      this.flashMassageService.show('Học sinh đã được thêm thành công', { cssClass: 'alert-success', timeout: 3000 });
    });
  }

}
