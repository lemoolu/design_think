'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {

  async logIn() {
    this.ctx.body = '登陆';
  }

  async signUp() {
    this.ctx.body = '注册';
  }

  async logOut() {
    this.ctx.body = '推出';
  }
}

module.exports = AuthController;
