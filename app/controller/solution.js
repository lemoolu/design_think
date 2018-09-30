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

  async _getVoteIdsBySolutionId(solutionId) {
    const { ctx } = this;
    const solution = await ctx.model.Solution.findById(solutionId);
    if (!solution) {
      throw new ApiError('解决方案不存在')
    }

    const starIds = solution.vote_ids || '';
    if (starIds === '') {
      return [];
    }
    return starIds.split(',').map(x => parseInt(x));
  }

  async _setVoteIdBySolutionId(solutionId, idList) {
    const solution = await this.ctx.model.Solution.findById(solutionId);
    return await solution.update({
      vote_ids: idList.join(','), // todo 是否可以编辑标题
    });
  }

  // 投票解决方案 post { solution_id }
  async vote() {
    const { ctx } = this;
    if (!ctx.request.body.solution_id) {
      throw new ApiError('请传入方案id');
    }

    const idList = await this._getVoteIdsBySolutionId(ctx.request.body.solution_id);
    if (idList.includes(ctx.user.id)) {
      throw new ApiError('您已投票过该方案');
    }
    idList.push(ctx.user.id);
    this._setVoteIdBySolutionId(ctx.request.body.solution_id, idList);
    ctx.body = '投票成功';
  }
}

module.exports = Solution;
