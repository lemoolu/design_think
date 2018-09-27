'use strict';
const path = require('path');
const sql = require('../sql.js');

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
      defaultViewEngine: 'ejs',
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

    sequelize: {
      dialect: 'mysql',
      database: 'design',
      host: sql.ip,
      port: '3306',
      username: 'root',
      password: sql.password,
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
