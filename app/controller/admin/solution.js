'use strict';
const ApiError = require('../../ApiError.js');

const Controller = require('egg').Controller;

class Solution extends Controller {

  // 获取解决方案列表
  async getListByProblem() {
    const ctx = this.ctx;
    if (!ctx.query.problem_id) {
      throw new ApiError('请传入问题id');
    }
    const problem = await ctx.model.Problem.findById(ctx.query.problem_id);
    if (!problem) {
      throw new ApiError('问题不存在')
    }

    const solutionList = await ctx.service.common.getPageData(ctx.model.Solution, ctx.query, {
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

  // { status, search page, pageSize}
  async getList() {
    const ctx = this.ctx;
    const option = {
      searchKey: ['content'],
      withUser: true,
      status: ctx.query.status,
      where: {},
      attributes: {
        // exclude: ['content']
      },
      order: [
        ['created_at', 'DESC']
      ]
    }

    const data = await ctx.service.common.getPageData(ctx.model.Solution, ctx.query, option);

    ctx.body = data;
  }

  // 解决方案审核 post { solution_id, status, verify_msg }
  async verify() {
    const id = this.ctx.request.body.solution_id;
    const solution = await this.ctx.model.Solution.findById(id);
    if (!solution) {
      throw new ApiError('方案不存在');
    }
    await solution.update({
      status: this.ctx.request.body.status,
      verify_msg: this.ctx.request.body.verify_msg
    });
    this.ctx.body = '审核成功';
  }

}

module.exports = Solution;
