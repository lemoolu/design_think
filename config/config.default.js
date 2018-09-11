'use strict';
const path = require('path');


module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1536648956603_8624';

  // add your config here
  config.middleware = [];

  // https://github.com/eggjs/egg-static
  config.static = {
    prefix: '/public/',
  };

  // https://github.com/eggjs/egg-view
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    cache: true,
    mapping: {
      '.ejs': 'ejs',
    },
  };

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(appInfo.baseDir, 'logs'),
  };

  return config;
};
