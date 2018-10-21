'use strict';
const ApiError = require('../ApiError.js');

const Controller = require('egg').Controller;


class LoginController extends Controller {

  async signUp() {
    const { ctx, app } = this;
    const data = ctx.request.body;

    app.validate({
      name: {
        required: true,
        message: '请填写昵称'
      },
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

    if (!data.name) {
      throw new ApiError('请填写昵称');
    }
    if (!data.password) {
      throw new ApiError('请填写密码');
    }

    const user = await ctx.model.User.findOne({
      where: { phone: data.phone }
    });

    if (user) {
      throw new ApiError('该手机号已存在');
    }

    const res = await ctx.model.User.tryCreate(data);
    ctx.body = res.get();
  }

  async login() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const user = await ctx.model.User.findOne({
      where: { phone: data.phone, password: data.password, is_admin: false }
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

  // 获取我的问题，type: create我创建的问题；star关注的问题；join我参与的问题
  async getMyProblem() {
    const { ctx } = this;
    const type = ctx.query.type;
    if (type === 'create') {
      const list = await ctx.model.Problem.findAll({
        where: {
          user_id: ctx.user.id,
        },
        order: [
          ['updated_at', 'DESC']
        ],
        attributes: ['id', 'title', 'status']
      });
      ctx.body = list;
    } else if (type === 'star' || type === 'join') {
      const relData = await ctx.model.RelUserProblem.findOne({
        where: { user_id: this.ctx.user.id }
      });
      if (relData) {
        const key = type === 'star' ? 'star_ids' : 'join_ids';
        const problemIds = ctx.helper.strToIds(relData.get()[key]);
        const list = [];
        for (let i = 0; i < problemIds.length; i++) {
          const p = await ctx.model.Problem.findById(problemIds[i]);
          const data = p && p.get();
          data && list.push({
            id: p.id,
            title: data.title,
          });
        }
        ctx.body = list;
      } else {
        ctx.body = [];
      }
    } else {
      ctx.body = [];
    }
  }

}

module.exports = LoginController;
