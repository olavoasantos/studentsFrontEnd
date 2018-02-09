
export default class ValidateCPF {

  static check(value) {
    return new Promise((resolve, reject) => {
      value = this.normalize(value);

      if(
        ! value                            // checar se é ''
        || value.length !== 11             // checar números diferentes de 11
        || (/^([0-9])\1+$/).test(value)    // checar números 111.111.111-11
        || !this.validateDigit(value, 10)  // checar 10o dígito
        || !this.validateDigit(value, 11)  // checar 11o dígito
      ) {
        reject(this.fail());
      }

      resolve(true);
    });
  }

  static normalize(value) {
    return value !== null ? value.toString().replace(/[^\d]+/g, '') : value;
  }

  static validateDigit(value, digit) {
    let sum = 0;    
    for (let i=0; i < digit-1; i++) {
      sum += parseInt(value.charAt(i)) * (digit - i);
    }
    let rev = 11 - (sum % 11);
    if (rev == 10 || rev == 11) rev = 0;    

    return (rev != parseInt(value.charAt(digit-1))) ? false : true;
  }

  static fail() {
    return 'CPF inválido';
  }

}