import { StudentService } from './../../student.service';
import { Student } from './../../student';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  student: Student;
  name = 'content';
  _id: string;
  hoten: string;
  khoa: string;
  lop: string;
  anhdaidien: string;
  quequan: string;
  ngaysinh: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private studentService: StudentService
  , private flashMassageService: FlashMessagesService,
    private _route: Router) {}

  ngOnInit() {
    this.route.paramMap
    .subscribe((param: ParamMap) => this.studentService.getStudent(param.get('id'))
    .subscribe(data => {
      console.log(data);
      this._id = data._id;
      this.student = data;
      this.hoten = data.hoten;
      this.khoa = data.khoa;
      this.lop = data.lop;
      this.anhdaidien = data.anhdaidien;
      this.quequan = data.quequan;
      this.ngaysinh = data.ngaysinh;
    })
    );

  }
  onSubmit(formEditStudent) {
    const fi = this.fileInput.nativeElement;
    const newEdit = formEditStudent.value;
    if (fi.files[0]) {
      newEdit.anhdaidien = fi.files[0].name;
      this.studentService.uploadImage(fi.files[0])
      .subscribe(res => console.log(res));
    }
    console.log(this._id);
    this.studentService.editStudent(this._id, newEdit)
    .subscribe(res => {
      console.log(res);
      this._route.navigate(['/list-student']);
      this.flashMassageService.show('Học sinh đã được sửa thành công', { cssClass: 'alert-success', timeout: 3000 });
    });
  }

}
