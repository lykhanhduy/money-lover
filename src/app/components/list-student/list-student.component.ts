import { StudentService } from './../../student.service';
import { Student } from './../../student';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  students: Student[];
  public popoverTitle = 'Xóa học sinh';
  public popoverMessage = 'Bạn có chắc chắn xóa học sinh này không ?';
  public confirmClicked = false;
  public cancelClicked = false;
  constructor(private studentService: StudentService, private _router: Router) { }

  ngOnInit() {
    this.studentService.getListStudent()
    .subscribe(data => {
      this.students = data;
      console.log(data);
    });

  }
  deleteStudent (id) {
    this.studentService.deleteStudent(id)
    .subscribe(() => {
      console.log(id);
      console.log(this.students[0]._id);
      for (let i = 0; i < this.students.length; i++) {
        if ( this.students[i]._id === id ) {
          this.students.splice(i, 1);
        }
      }
    });
  }
  themH