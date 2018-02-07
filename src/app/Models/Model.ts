import Errors from './Errors';

export default class Model {
  
  public id:         number;
  public $data:      object;
  public errors:     object;
  public url:        string;
  public static url: string;
  
  public form = {};

  constructor(data: object) {
    this.hydrate(data);
    this.$data = data;
    this.errors = new Errors;
  }

  protected hydrate(data: object) {
    for(let field in data) {
      this[field] = data[field];
      if(field in this.form) this.form[field] = data[field];
    }
  }

  public reset() {
    this.hydrate(this.$data);
  }

  public static all() {
    let Collection = [];
    
    return new Promise((resolve, reject) => {
      axios.get(this.url)
      .then(response => {
        Collection = response.data.map(
          data => new this(data)
        );

        resolve(Collection);
      })
      .catch(error => {
        reject( error );
      });
    });
  }

  public static find(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/${id}`)
      .then(response => {
        resolve(new this(response.data));
      })
      .catch(error => {
        reject( error );
      });
    });
  }

  public static store(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.url, data)
      .then(response => {
        resolve(new this(response.data));
      })
      .catch(error => {
        reject( new Errors(error.response.data) );
      });
    });
  }

  public update() {
    return new Promise((resolve, reject) => {
      axios.patch(`${this.url}/${this.id}`)
      .then(response => {
        this.hydrate(response.data);
        this.$data = response.data;

        resolve(this);
      })
      .catch(error => {
        reject( new Errors(error.response.data) );
      });
    });
  }

  public delete() {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/${this.id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject( error );
      });
    });
  }

}