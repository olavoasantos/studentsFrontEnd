import { Component } from '@angular/core';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss']
})
export class StudentIndexComponent {
  
  public window = window;
  public Students = this.window['$store'].state.students;

  constructor() {
    window['$store'].getStudents();
  }

  view(student) {
    window['$store'].showStudent(student);
  }

}
