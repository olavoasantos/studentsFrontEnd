import Model from './Model';

const url = 'http://localhost:7000/students';

export default class Student extends Model {
  
  public id:          number;
  public name:        string;
  public birthday:    string;
  public grade:       number;
  public created_at:  string;
  public updadted_at: string;
  public mother:      object;
  public address:     object;

  url = url;
  static url = url;

  public form = {
    name: '',
    birthday: '',
    grade: null
  }

}