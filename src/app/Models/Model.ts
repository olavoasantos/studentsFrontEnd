import axios from 'axios';

const getToken = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

export default class Model {
  
  public id:         number;
  public $data:      object;
  public url:        string;
  public static url: string;
  
  public form;

  constructor(data: object = {}) {
    this.$data = data;
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
      getToken();
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
    getToken();
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
    getToken();
    return new Promise((resolve, reject) => {
      axios.post(this.url, data)
      .then(response => {
        resolve(new this(response.data));
      })
      .catch(error => {
        reject( error.response.data );
      });
    });
  }

  public update() {
    getToken();
    return new Promise((resolve, reject) => {
      axios.patch(`${this.url}/${this.id}`, this.form)
      .then(response => {
        this.hydrate(response.data);
        this.$data = response.data;

        resolve(this);
      })
      .catch(error => {
        reject( error.response.data );
      });
    });
  }

  public delete() {
    getToken();
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