'use strict';
const ApiError = require('../ApiError.js');

const Controller = require('egg').Controller;

class LoginController extends Controller {

  async signUp() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const res = await ctx.model.User.tryCreate(data);
    ctx.body = res.dataValues;
  }

  async login() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const user = await ctx.model.User.findOne({
      where: { phone: data.phone, password: data.password }
    });

    if (!user) {
      ctx.session = null;
      throw new ApiError('手机号或密码错误');
    } else {
      ctx.session.id = user.id;
      ctx.body = '登陆成功';
    }
  }

  async logout() {
    const ctx = this.ctx;
    ctx.session = null;
    ctx.redirect('/');
  }

  async getInfo() {
    const ctx = this.ctx;
    ctx.body = ctx.user;
  }

  async updateInfo() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const user = await ctx.model.User.findById(ctx.session.id);
    ctx.body = await user.update({
      job: data.job,
      introduction: data.introduction,
      avatar: data.avatar
    });
  }

}

module.exports = LoginController;
