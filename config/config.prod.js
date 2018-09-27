'use strict';
const path = require('path');


module.exports = appInfo => {
  const config = {
    cluster: {
      listen: {
        port: 8000,
        hostname: '127.0.0.1',
      },
    },

    security: {
      domainWhiteList: ['.127.0.0.1'], // TODO 安全白名单，以 . 开头
      csrf: {
        enable: true,
      },
    },


    // mysql: {
    //   client: {
    //     host: '10.242.109.75',
    //     port: '3306',
    //     user: 'root',
    //     password: '123456',
    //     database: 'test',
    //   },
    // },

  };

  return config;
};
