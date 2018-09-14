'use strict';
/**
 * 接口错误类型
 */

class ApiError extends Error {
  constructor(message = 'error') {
    super();
    this.message = message;
    this.status = 200;
  }
}

global.ApiError = ApiError;

module.exports = ApiError;
