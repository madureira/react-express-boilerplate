import axios from 'axios';

/**
 * Responsible for making ajax requests to the api.
 */
class Api {
  constructor() {
    this._baseUrl = '/api';
    this._timeout = 5000;
    this._instance = null;
  }

  /**
   * Fetch data on api.
   *
   * @async
   * @param {string} resource - The resource's uri
   * return {object} response
   */
  async read(resource) {
    try {
      return await this._getInstance().get(resource);
    } catch (error) {
      this._errorHandler(error);
      return null;
    }
  }

  /**
   * Inserts data on api.
   *
   * @async
   * @param {string} resource - The resource's uri
   * @param {object} data - data to be inserted
   * return {object} response
   */
  async add(resource, data) {
    try {
      return await this._getInstance().post(resource, data);
    } catch (error) {
      this._errorHandler(error);
      return null;
    }
  }

  /**
   * Updates data on api.
   *
   * @async
   * @param {string} resource - The resource's uri
   * @param {object} data - data to be updated
   * return {object} response
   */
  async update(resource, data) {
    try {
      return await this._getInstance().put(resource, data);
    } catch (error) {
      this._errorHandler(error);
      return null;
    }
  }

  /**
   * Deletes data on api.
   *
   * @async
   * @param {string} resource - The resource's uri
   * return {object} response
   */
  async remove(resource) {
    try {
      return await this._getInstance().delete(resource);
    } catch (error) {
      this._errorHandler(error);
      return null;
    }
  }

  _getInstance() {
    if (!this._instance) {
      this._instance = axios.create({
        baseURL: this._baseUrl,
        timeout: this._timeout,
      });
    }

    return this._instance;
  }

  _errorHandler(err) {
    if (err && err.response) {
      const statusCode = err.response.status;
      const message = err.response.data;

      console.error(statusCode);
    }
  }
}

export default new Api();
