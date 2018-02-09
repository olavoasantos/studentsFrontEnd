import axios from 'axios';

export default class ValidateCEP {

  static check(value) {
    value = this.normalize(value);
    return new Promise((resolve, reject) => {
      if(value === null) {
        reject(this.fail());
        return;
      }

      const Authorization = axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['Authorization'];

      axios.get(`https://viacep.com.br/ws/${value}/json/`).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(this.fail());
      });
      axios.defaults.headers.common['Authorization'] = Authorization;
    })
  }

  static normalize(value) {
    return value !== null ? value.toString().replace(/[^\d]+/g, '') : value;
  }

  static fail() {
    return 'CEP inválido'
  }

}