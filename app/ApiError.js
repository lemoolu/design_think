'use strict';
/**
 * 接口错误类型
 */

class ApiError extends Error {
  constructor(message = 'error', status = 200) {
    super();
    this.message = message;
    this.status = status;
  }
}

global.ApiError = ApiError;

module.exports = ApiError;
