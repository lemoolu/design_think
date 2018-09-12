'use strict';
const path = require('path');


module.exports = appInfo => {
  const config = {

    logger: {
      consoleLevel: 'DEBUG',
      dir: path.join(appInfo.baseDir, 'logs'),
    },

    cluster: {
      listen: {
        port: 8000,
        hostname: '127.0.0.1',
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
