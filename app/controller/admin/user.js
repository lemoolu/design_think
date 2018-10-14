'use strict';
const ApiError = require('../../ApiError.js');

const Controller = require('egg').Controller;

class User extends Controller {
  // { status, search, page, pageSize}
  async getList() {
    const ctx = this.ctx;
    const option = {
      searchKey: ['name'],
      withUser: false,
      status: ctx.query.status,
      where: {},
      attributes: {
        // exclude: ['content']
      },
      order: [
        ['created_at', 'DESC']
      ]
    }
    const data = await ctx.service.common.getPageData(ctx.model.User, ctx.query, option);
    ctx.body = data;
  }

}

module.exports = User;
