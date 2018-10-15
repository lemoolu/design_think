'use strict';
const shortid = require('shortid');
const ApiError = require('../../ApiError.js');

const Controller = require('egg').Controller;

class Ctrl extends Controller {

  async login() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const user = await ctx.model.User.findOne({
      where: { phone: data.phone, password: data.password, is_admin: true }
    });

    if (!user) {
      ctx.session = null;
      throw new ApiError('账户名或密码错误');
    } else {
      ctx.session.id = user.id;
      ctx.body = '登陆成功';
    }
  }

  async logout() {
    const ctx = this.ctx;
    ctx.session = null;
    ctx.redirect('/admin');
  }

  async getInfo() {
    const ctx = this.ctx;
    console.log(ctx.user)
    ctx.body = ctx.user;
  }

  // 生成邀请码
  async inviteCodeGen() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    if (!data.count) {
      throw new ApiError('请传入count');
    }
    let res = [];
    for (let i = 0; i < data.count; i++) {
      let id = shortid.generate();
      res.push(id);
      await ctx.model.InviteCode.create({ id: id, user_id: ctx.user.id, created_at: new Date() });
    }

    ctx.body = res;
  }

  async inviteCodeList() {
    const ctx = this.ctx;
    let isUsed = ctx.query.is_used;
    const Op = this.ctx.app.Sequelize.Op;
    const option = {
      withUser: false,
      attributes: {},
      where: {},
      order: [
        ['created_at', 'DESC']
      ]
    };
    if (isUsed === 'true') {
      option.where.use_user_id = { [Op.not]: null };
    }
    if (isUsed === 'false') {
      option.where.use_user_id = null;
    }
    const data = await ctx.service.common.getPageData(ctx.model.InviteCode, ctx.query, option);

    for (let i = 0; i < data.list.length; i++) {
      const item = data.list[i];
      if (item.use_user_id) {
        item.use_user = await ctx.model.User.findById(item.use_user_id)
      }
    }

    ctx.body = data;
  }

}

module.exports = Ctrl;
