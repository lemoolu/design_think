'use strict';
const path = require('path');


module.exports = appInfo => {
  const config = exports = {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1536648956603_8624',
    static: {
      prefix: '/public/',
    },
    view: {
      root: path.join(appInfo.baseDir, 'app/view'),
      cache: true,
      mapping: {
        '.ejs': 'ejs',
      },
    },
    logger: {
      consoleLevel: 'DEBUG',
      dir: path.join(appInfo.baseDir, 'logs'),
    },
    security: {
      csrf: {
        enable: false,
      },
    },

    middleware: ['errorHandler'],
    // 只对 /api 前缀的 url 路径生效
    errorHandler: {
      match: '/api',
    },

  };

  return config;
};
