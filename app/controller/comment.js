'use strict';
const ApiError = require('../ApiError.js');

const Controller = require('egg').Controller;

class Comment extends Controller {
  // 添加评论 post
  async add() {
    const { ctx } = this;
    const data = Object.assign({
      solution_id: null,
      content: null,
      user_id: ctx.user.id,
    }, ctx.request.body);

    const solution = await ctx.model.Solution.findById(data.solution_id);
    if (!solution) {
      throw new ApiError('解决方案不存在')
    }

    await ctx.model.Comment.create(data)
    ctx.body = '评论添加成功';
  }

  async getList() {
    const ctx = this.ctx;
    if (!ctx.query.solution_id) {
      throw new ApiError('请传入方案id');
    }

    const data = await ctx.service.common.getPageData(ctx.model.Comment, ctx.query, {
      withUser: true,
      status: [true, null],
      where: { solution_id: parseInt(ctx.query.solution_id) },
      order: [
        ['created_at', 'DESC']
      ]
    });

    ctx.body = data;
  }

  async del() {
    const ctx = this.ctx;
    await ctx.service.common.delData(ctx.model.Comment, ctx.request.body.id, { isNeedOwer: true }, {});
  }
}

module.exports = Comment;
