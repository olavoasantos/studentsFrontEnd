import { Component } from '@angular/core';
import Student from './Models/Student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  Students;
  formBlank = { name: '', birthday: '', grade: null };
  form = { name: '', birthday: '', grade: null };

  login = () => {
    axios.post('http://localhost:7000/auth', {email: 'olavo@example.com', password: '123456'}).then(r=>{
      localStorage.setItem('token', r.data.token);
    }).catch(err => console.log(err));
  }

  constructor() {
    Student.all()
      .then(students => this.Students = students)
      .catch(error => console.error(error));
  }

  findStudent = (id) => {
    Student.find(id).then(student => console.log(student));
  }

  addStudent = () => {
    Student.store(this.form).then(student => {
      this.Students.push(student);
      this.form = Object.assign({}, this.formBlank);
    }).catch(err => console.error(err));
  }

  destroyStudent = (i) => {
    let Student = this.Students[i];

    Student.delete().then(r => {
      this.Students = this.Students.filter(student => student.id !== Student.id);
    }).catch(err => console.error(err));
  }
}
