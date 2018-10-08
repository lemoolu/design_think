'use strict';
const ApiError = require('../ApiError.js');

const Controller = require('egg').Controller;

class Solution extends Controller {
  // 添加解决方案 post { problem_id, content, user_id }
  async add() {
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

  async del() {
    const ctx = this.ctx;
    const solution = await ctx.model.Solution.findById(ctx.body.solution_id);
    if (!solution) {
      throw new ApiError('方案不存在')
    }
    if (solution.user_id !== ctx.user.id) {
      throw new ApiError('当前用户无权限操作');
    }
    await solution.destroy();
    ctx.body = '方案删除成功';
  }

  // 获取解决方案列表
  async getList() {
    const ctx = this.ctx;
    if (!ctx.query.problem_id) {
      throw new ApiError('请传入问题id');
    }
    const problem = await ctx.model.Problem.findById(ctx.query.problem_id);
    if (!problem) {
      throw new ApiError('问题不存在')
    }

    let solutionList = await ctx.service.common.getPageData(ctx.model.Solution, ctx.query, {
      withUser: true,
      where: { problem_id: parseInt(ctx.query.problem_id) },
      order: [
        // ['created_at', 'DESC']
      ]
    });

    // solutionList = solutionList.dataValues;
    solutionList.list.forEach(x => {
      x.vote_count = ctx.helper.strToIds(x.vote_ids || '').filter(x => x !== '').length;
      x.vote_ids = undefined;
    })

    ctx.body = solutionList;
  }

  // 投票解决方案 post { solution_id }
  async vote() {
    const { ctx } = this;
    if (!ctx.request.body.solution_id) {
      throw new ApiError('请传入方案id');
    }

    const solution = await this.ctx.model.Solution.findById(ctx.request.body.solution_id);
    if (!solution) {
      throw new ApiError('解决方案不存在')
    }

    if (ctx.helper.strHasId(solution.vote_ids, ctx.user.id)) {
      throw new ApiError('您已投票过该方案');
    }
    await solution.update({
      vote_ids: ctx.helper.strAddId(solution.vote_ids, ctx.user.id),
    });
    ctx.body = '投票成功';
  }
}

module.exports = Solution;
