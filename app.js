'use strict';
const revalidator = require('revalidator');
const ApiError = require('./app/ApiError.js');
const _ = require('lodash');


module.exports = app => {
  app.beforeStart(async() => {

  });
  app.ready(async() => {
    // console.log(app.model.Sequelize);
  });

  /**
   * 数据校验函数 https://github.com/flatiron/revalidator
   * @param  {Object} properties 校验格式
   * @param  {Object} data       校验数据
   *
   * 
   */
  app.validate = function(properties, data) {
    Object.keys(properties).forEach(key => {
      const item = properties[key];
      if (item.messages && _.isString(item.messages)) {
        const msg = item.messages;
        item.messages = {};
        Object.keys(item).forEach(itemKey => {
          item.messages[itemKey] = msg;
        });
      }
    });
    const res = revalidator.validate(data, { properties });
    if (res.valid === false) {
      throw new ApiError(_.get(res.errors, '[0].message'), 200);
    }
  }
};
