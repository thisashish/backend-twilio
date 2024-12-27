const axios = require('axios');
const twilio = require('twilio');

class MyRequestClient extends twilio.HttpClient {
  constructor(timeout, proxy) {
    super();
    this.timeout = timeout;
    this.proxy = proxy;
  }

  request(requestOptions) {
    const { method, uri, headers, params, data } = requestOptions;

    const axiosOptions = {
      method,
      url: uri,
      headers,
      params,
      data,
      timeout: this.timeout,
      proxy: {
        protocol: this.proxy.protocol,
        host: this.proxy.host,
        port: this.proxy.port,
      },
    };

    return axios(axiosOptions)
      .then(response => ({
        statusCode: response.status,
        body: response.data,
        headers: response.headers,
      }))
      .catch(error => {
        if (error.response) {
          throw {
            statusCode: error.response.status,
            message: error.response.statusText,
            details: error.response.data,
          };
        } else {
          throw error;
        }
      });
  }
}

module.exports = MyRequestClient;
