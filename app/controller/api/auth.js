'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {

  async logIn() {
    const data = this.ctx.request.body;
    let user = await this.ctx.model.User.findOne({
      where: { phone: data.phone, password: data.password }
    });

    if (!user) {
      this.ctx.body = '手机号或密码错误';
      this.ctx.session = null;
    } else {
      this.ctx.session.id = user.id;
      this.ctx.body = { aa: '登陆成功' };
    }
    // ctx.cookies.set('count', ++count);
  }

  async signUp() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.model.User.tryCreate(data);
    this.ctx.body = res.dataValues;
  }

  async logOut() {
    this.ctx.body = '推出';
  }


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
