'use strict';
const ApiError = require('../ApiError.js');
const Controller = require('egg').Controller;


class ProblemController extends Controller {
  async add() {
    const { ctx, app } = this;
    const data = ctx.request.body;

    app.validate({
      title: {
        required: true,
        messages: {
          required: '请填写标题',
        }
      },
      content: {
        required: true,
        messages: '请填写内容',
      }
    }, ctx.request.body);

    const res = await ctx.model.Problem.tryCreate({
      title: data.title,
      content: data.content,
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
      title: data.title, // todo 是否可以编辑标题
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

  async _getStarIdsByProblemId(problemId) {
    const { ctx } = this;
    const problem = await ctx.model.Problem.findById(problemId);
    if (!problem) {
      throw new ApiError('问题不存在')
    }

    const starIds = problem.star_ids || '';
    if (starIds === '') {
      return [];
    }
    return starIds.split(',').map(x => parseInt(x));
  }

  async _setStarIdByProblemId(problemId, idList) {
    const problem = await this.ctx.model.Problem.findById(problemId);
    return await problem.update({
      star_ids: idList.join(','), // todo 是否可以编辑标题
    });
  }

  // 用户关注问题 post { problem_id }
  async userStar() {
    const { ctx } = this;
    if (!ctx.request.body.problem_id) {
      throw new ApiError('请传入问题id');
    }

    const idList = await this._getStarIdsByProblemId(ctx.request.body.problem_id);
    if (idList.includes(ctx.user.id)) {
      throw new ApiError('您已关注过该问题');
    }
    idList.push(ctx.user.id);
    this._setStarIdByProblemId(ctx.request.body.problem_id, idList);
    ctx.body = '问题关注成功';
  }

  // 添加解决方案
  async addSolution() {
    const { ctx } = this;
    const data = Object.assign({
      problem_id: null,
      content: null,
      user_id: ctx.user.id,
    }, ctx.request.body);
    const problem = await ctx.model.Problem.findById(data.problem_id);
    if (!problem) {
      throw new ApiError('问题不存在')
    }

    await ctx.model.Solution.create(data)
    ctx.body = '解决方案添加成功';
  }

}

module.exports = ProblemController;
