const MongoLib = require('../lib/mongo');

class MusiciansService {
  constructor() {
    this.collection = 'bands';
    this.collectionUsers = 'users';
    this.mongoDB = new MongoLib();
  }

  async getMusicians({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const bands = await this.mongoDB.getAll(this.collection, query);
    const users = await this.mongoDB.getAll(this.collectionUsers, query);

    return (bands.length + users.length) || -1;
  }

  
}

module.exports = MusiciansService;