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
    let arr = {};
    let users;
    let bands;
    await this.mongoDB.getAll('users').then((res) => {
      users = res;
    });
    await this.mongoDB.getAll('bands').then((res) => {
      bands = res;
    });
    arr.users = users;
    arr.bands = bands;
    return arr;
  }

  async getLocation() {
    let locations = [];
    await this.mongoDB.getDocumentsLocation('users').then((res) => {
      locations.push(res);
    });
    await this.mongoDB.getDocumentsLocation('bands').then((res) => {
      locations.push(res);
    });
    return locations;
  }

  async getByLocation(location){
    let totalsPerLocation = []
    await this.mongoDB.getDocumentsByLocation('users', location).then((res) => {
      totalsPerLocation.push(res)
    })
    await this.mongoDB.getDocumentsByLocation('bands', location).then((res) => {
      totalsPerLocation.push(res)
    })
    return totalsPerLocation
  }
}

module.exports = TotalService;
