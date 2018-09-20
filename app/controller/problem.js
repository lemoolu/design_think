'use strict';
const ApiError = require('../ApiError.js');

const Controller = require('egg').Controller;

class ProblemController extends Controller {
  async add() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const res = await ctx.model.Problem.tryCreate({
      ...data,
      user_id: ctx.user.id
    });
    ctx.body = res;
  }

  async updata() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const problem = await ctx.model.Problem.findById(data.id);
    if (!problem) {
      throw new ApiError('问题不存在');
    }
    if (problem.user_id !== ctx.user.id) {
      throw new ApiError('当前用户无权限操作');
    }
    ctx.body = await problem.update({
      title: data.title,
      content: data.content
    });
  }


  async getById() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    ctx.body = await ctx.model.Problem.findById(id);
  }


  async getList() {
    const ctx = this.ctx;
    const res = await ctx.helper.getPageData(ctx.model.Problem, ctx.query, ctx.app.Sequelize, ['title']);
    ctx.body = res;
  }

  async del() {
    const ctx = this.ctx;
    const problem = await ctx.model.Problem.findById(ctx.query.id);
    if (!problem) {
      throw new ApiError('问题不存在')
    }
    if (problem.user_id !== ctx.user.id) {
      throw new ApiError('当前用户无权限操作');
    }
    await problem.destroy();
    ctx.body = '问题删除成功';
  }
}

module.exports = ProblemController;
