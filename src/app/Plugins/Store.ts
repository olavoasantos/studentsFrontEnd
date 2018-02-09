import Errors from './Errors';
import Student from '../Models/Student.model';

export default class Store {

  state = {
    student: null,
    students: null,
    route: 'index',
    errors: new Errors,
    formIsVisible: false,
    form: (new Student).form,
  }

  setRoute(route) {
    this.state.route = route;
  }

  openForm() {
      this.state.formIsVisible = true;
  }

  closeForm() {
      this.state.formIsVisible = false;
  }

  clearForm() {
    this.state.form = (new Student).form;
    this.state.student = null;
  }

  return() {
    this.setRoute('index');
    this.clearForm();
  }

  getStudents() {
    Student.all().then(students => {
      this.state.students = students;
    });
  }

  addStudent(student) {
    this.state.students.push(student);
  }

  storeStudent() {
    Student.store(this.state.form)
           .then(student => this.addStudent(student))
           .catch(err => this.state.errors['errors'] = err);
    this.setRoute('index');
    this.clearForm();
  }

  showStudent(student) {
    this.state.student = student;
    this.setRoute('show');
  }

  editStudent(student) {
    student.form.action = 'edit';
    this.state.student = student;
    this.state.form = student.form;
    this.setRoute('form');
  }

  updateStudent() {
    this.state.student.hydrate(this.state.form);
    this.state.student.update()
           .then(student => {
              this.state.students = this.state.students.map(
                Student => Student['id'] === student['id'] ? student : Student
              );
           })
           .catch(err => this.state.errors['errors'] = err);
    this.setRoute('index');
    this.clearForm();
  }

  deleteStudent(student) {
    const id = student.id;
    student.delete().then(r => {
      this.state.students = this.state.students.filter(student => student.id !== id);
    })
  }
  
}