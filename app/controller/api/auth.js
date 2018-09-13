'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {

  // 登录
  async logIn() {
    const data = this.ctx.request.body;
    const user = await this.ctx.model.User.findOne({
      where: { phone: data.phone, password: data.password }
    });

    if (!user) {
      this.ctx.body = '手机号或密码错误';
      this.ctx.session = null;
    } else {
      this.ctx.session.id = user.id;
      this.ctx.body = '登陆成功';
    }
  }

  // 注册
  async signUp() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.model.User.tryCreate(data);
    this.ctx.body = res.dataValues;
  }

  // 退出
  async logOut() {
    this.ctx.session = null;
    this.ctx.redirect('/')
  }

  // 获取当前登陆用户信息
  async info() {
    const userId = this.ctx.session.id;
    const user = await this.ctx.model.User.findById(userId);
    console.log(userId);
    if (user) {
      this.ctx.body = user;
    } else {
      this.ctx.status = 401;
    }
  }
}

module.exports = AuthController;
