'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {

  async logIn() {
    this.ctx.body = '登陆';
    // ctx.cookies.set('count', ++count);
  }

  async signUp() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.user.insert(data);
    this.ctx.body = await ctx.service.user.get(res.insertId);
  }

  async logOut() {
    this.ctx.body = '推出';
  }
}

module.exports = AuthController;
