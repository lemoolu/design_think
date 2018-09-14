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
      domainWhiteList: ['.127.0.0.1'], // 安全白名单，以 . 开头
      csrf: {
        enable: false,
      },
    },

    middleware: ['errorHandler'],
    // 只对 /api 前缀的 url 路径生效
    errorHandler: {
      match: '/api',
    },

    session: {
      maxAge: 24 * 3600 * 1000, // ms
      key: 'EGG_SESS',
      httpOnly: true,
      encrypt: true,
    },

    multipart: {
      whitelist: ['.png', '.jpg', '.jpeg'], // 覆盖整个白名单，只允许上传 '.png' 格式
    },


    mysql: {
      client: {
        // host: '127.0.0.1',
        host: '10.242.109.75',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'design',
      },
      app: true,
      // load into agent, default is close
      agent: false,
    },

    sequelize: {
      dialect: 'mysql',
      database: 'design',
      host: '10.242.109.75',
      port: '3306',
      username: 'root',
      password: '123456',
      operatorsAliases: false,
      define: {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        charset: 'utf8',
        dialectOptions: {
          collate: 'utf8_general_ci'
        },
        timestamps: true
      },
    },
  };

  return config;
};
