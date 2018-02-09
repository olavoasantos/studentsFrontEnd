import axios from 'axios';

export default class AuthModel {
  static register(email, password, passwordConfirmation) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:7000/user', {email, password, 'password_confirmation': passwordConfirmation}).then(r=>{
        localStorage.setItem('token', r.data.token);
        resolve(r.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  static login(email, password) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:7000/auth', { email, password }).then(r=>{
        localStorage.setItem('token', r.data.token);
        resolve(r.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  static logout() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    
    return new Promise((resolve, reject) => {
      axios.delete('http://localhost:7000/auth').then(r=>{
        localStorage.removeItem('token');
        resolve(r.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

}