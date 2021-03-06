const MongoLib = require('../lib/mongo');

class BandsService {
  constructor() {
    this.collection = 'bands';
    this.mongoDB = new MongoLib();
  }

  async getBands({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const bands = await this.mongoDB.getAll(this.collection, query);
    return bands || [];
  }

  async getBand({ bandId }) {
    const band = await this.mongoDB.get(this.collection, bandId);
    return band || {};
  }

  async getBandsByLatLng({ location }) {
    const latLngBands = await this.mongoDB.get(this.collection, location);
    return latLngBands || {};
  }

  async createBand({ band }) {
    const createBandId = await this.mongoDB.create(this.collection, band);
    return createBandId;
  }

  async updateBand({ bandId, band } = {}) {
    const updatedBandId = await this.mongoDB.update(
      this.collection,
      bandId,
      band
    );
    return updatedBandId;
  }

  async deleteBand({ bandId }) {
    const deletedBandId = await this.mongoDB.delete(this.collection, bandId);
    return deletedBandId;
  }

  async getLengthBands({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const bands = await this.mongoDB.getAll(this.collection, query);
    const lengthBands = bands.length;
    return lengthBands || -1;
  }
}

module.exports = BandsService;