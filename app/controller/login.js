'use strict';
const ApiError = require('../ApiError.js');

const Controller = require('egg').Controller;


class LoginController extends Controller {

  async signUp() {
    const { ctx, app } = this;
    const data = ctx.request.body;

    app.validate({
      phone: {
        required: true,
        pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        messages: {
          required: '请填写手机号',
          pattern: '请填写正确格式的手机号'
        }
      },
      password: {
        required: true,
        messages: '请填写密码',
      }
    }, ctx.request.body);

    const user = await ctx.model.User.findOne({
      where: { phone: data.phone }
    });

    if (user) {
      throw new ApiError('该手机号已存在');
    }

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

// console.log('------')
// console.log(/^1,|,1,|,1/.test('10,23,45,23,00,21'))

module.exports = LoginController;
