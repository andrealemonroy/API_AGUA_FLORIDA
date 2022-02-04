const MongoLib = require('../lib/mongo');
class TotalService {
  constructor() {
    this.collection = 'total';
    this.mongoDB = new MongoLib();
  }

  async getSumTotal() {
    let users;
    let bands;
    await this.mongoDB.getSumTotal('users').then((res) => {
      users = res;
    });
    await this.mongoDB.getSumTotal('bands').then((res) => {
      bands = res;
    });
    return users + bands;
  }

  async getTotal() {
    let arr = {}
    let users;
    let bands;
    await this.mongoDB.getAll('users').then((res) => {
      users =res
    });
    await this.mongoDB.getAll('bands').then((res) => {
      bands =res
    });
    arr.users = users;
    arr.bands = bands
    return arr;
  }
}

module.exports = TotalService;
