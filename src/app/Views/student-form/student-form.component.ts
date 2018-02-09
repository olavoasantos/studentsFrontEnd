import { Component, Input } from '@angular/core';

import Student from '../../Models/Student.model';
import ValidateCPF from '../../Validation/ValidateCPF';
import ValidateCEP from '../../Validation/ValidateCEP';
import ValidateRequired from '../../Validation/ValidateRequired';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})

export class StudentFormComponent {

  public window = window;
  public form = window['$store'].state.form;
  public errors = window['$store'].state.errors;

  public rules() {
    return {
      'name': ['Required'],
      'birthday': ['Required'],
      'grade': ['Required'],
      'mother.name': ['Required'],
      'mother.cpf': ['Required', 'CPF'],
      'mother.charge_at': ['Required'],
      'address.postal_code': ['Required', 'CEP'],
      'address.street': ['Required'],
      'address.number': ['Required'],
      'address.complement': [],
      'address.neighborhood': ['Required'],
      'address.city': ['Required'],
      'address.state': ['Required'],
    }
  }

  validate(field, e) {
    this.rules()[field].forEach(rule => {
      this[`check${rule}`](field, e.target.value);
    });
  }

  pushError(field, value) {
    window['$store'].state.errors.push(field, value);
  }

  checkRequired(field, value) {
    ValidateRequired
               .check(value)
               .then(response => {
                 window['$store'].state.errors.clear(field);
               })
               .catch( err =>  window['$store'].state.errors.push(field, err) );
  }

  checkCEP(field, value) {
    ValidateCEP
              .check( value )
              .then(response => {
                window['$store'].state.errors.clear(field);
                this.assignAddress(response);
              })
              .catch( err =>  window['$store'].state.errors.push(field, err) );
  }

  checkCPF(field, value) {
    ValidateCPF
              .check( value )
              .then(response => {
                window['$store'].state.errors.clear(field);
              })
              .catch( err =>  window['$store'].state.errors.push(field, err) );
  }

  assignAddress(data) {
    window['$store'].state.form.address.street = data.logradouro;
    window['$store'].state.form.address.neighborhood = data.bairro;
    window['$store'].state.form.address.city = data.localidade;
    window['$store'].state.form.address.state = data.uf;
  }

  submit() {
    window['$store'].state.form.action === 'create'
                                  ? window['$store'].storeStudent()
                                  : window['$store'].updateStudent();
  }

}
