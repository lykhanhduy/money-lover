
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './student.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AppComponent } from './app.component';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';

const routes: Routes = [
  { path: 'list-student', component: ListStudentComponent },
  { path: 'add-student', component: AddStudentComponent },
  {
    path: 'edit-student/:id',
    component: EditStudentComponent,
  },
  { path: '',
    redirectTo: '/list-student',
    pathMatch: 'full'
  },
  { path: '**', component: ListStudentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListStudentComponent,
    AddStudentComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
