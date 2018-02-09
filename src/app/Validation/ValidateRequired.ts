import axios from 'axios';

export default class ValidateRequired {

  static check(value) {
    return new Promise((resolve, reject) => {
      if(!value || value === null) {
        reject(this.fail());
        return;
      }

      resolve();
    })
  }

  static fail() {
    return 'Campo obrigatório'
  }

}