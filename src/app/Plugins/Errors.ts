export default class Errors {

  protected errors: object;

  constructor(errors: object = {}) {
    this.errors = errors;
  }

  public has(field: string) : boolean {
    return this.errors.hasOwnProperty(field);
  }

  public empty() : boolean {
    return Object.keys(this.errors).length === 0;
  }

  public get(field: string) {
    return this.has(field) ? this.errors[field]
                           : this.errors;
  }

  public push(field: string, value: string) {
    (this.has(field)) ? this.errors[field].push(value)
                      : this.errors[field]  =  [value];
  }

  public clear(field: string = null) {
    if(field) {
      delete this.errors[field];
      return;
    }

    this.errors = {};
  }

}