'use strict';
const ApiError = require('../ApiError.js');

const Controller = require('egg').Controller;

class Solution extends Controller {
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
      throw new ApiError('该解决方案不存在')
    }

    await ctx.model.Comment.create(data)
    ctx.body = '评论添加成功';
  }
}

module.exports = Solution;
