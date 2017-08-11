const request = require('request');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};

    if (!options.key || !options.secret)
      throw new Error("No nexmo key or secret provided");

    this.api_key = options.key;
    this.api_secret = options.secret;
  }

  setup (app) {
    this.app = app;
  }

  find (params) {
    return Promise.resolve([]);
  }

  get (id, params) {
    return new Promise((resolve, reject) => {

      request({
        url: "https://rest.nexmo.com/search/message",
        headers: {
          'Content-Type': 'application/json'
        },
        qs: {
          'api_key': this.api_key,
          'api_secret': this.api_secret,
          'id': id
        }

      }, function (error, response, body) {

        if (error) {
          reject(JSON.parse(error));
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  create (data, params) {

    const { text , to } = data

    if (!text || !to)
      throw new Error("Please provide text or destination number");

    const { from } = data;

    let obj = {
     api_key: this.api_key,
     api_secret: this.api_secret,
     to: to,
     from: from,
     text: text
    };

    return new Promise((resolve, reject) => {

      request({
        url: "https://rest.nexmo.com/sms/json",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)

      }, function (error, response, body) {
        if (error) {
          reject(JSON.parse(error));
        } else {
          resolve(JSON.parse(body));
        }
      });
    });

    return Promise.resolve(data);
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
