'use strict';

// had enabled by egg
// exports.static = true;


exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.session = true;
