'use strict';
const ApiError = require('../../ApiError.js');
const Controller = require('egg').Controller;


class ProblemController extends Controller {

  async getById() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const _problem = await ctx.model.Problem.findById(id);
    if (!_problem) {
      throw new ApiError('问题不存在');
    }
    const problem = _problem.dataValues;
    problem.user_data = await ctx.model.User.findById(problem.user_id);
    problem.star_count = ctx.helper.strToIds(problem.star_ids).length;

    ctx.body = problem;
  }

  // get { page: '', pageSize: '', search, status: 'true', 'false', 'null'}
  async getList() {
    const ctx = this.ctx;
    const option = {
      searchKey: ['title'],
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
    const problemData = await ctx.service.common.getPageData(ctx.model.Problem, ctx.query, option);

    for (let i = 0; i < problemData.list.length; i++) {
      const item = problemData.list[i];
      item.star_count = ctx.helper.strToIds(item.star_ids).length;
      item.solution_count = await ctx.model.Solution.count({ where: { problem_id: item.id } });
    }

    ctx.body = problemData;
  }

  // 问题删除 { id }
  async del() {
    const ctx = this.ctx;
    await ctx.service.common.delData(ctx.model.Problem, ctx.request.body.id, {});
  }

  // 问题审核 post { problem_id, status, verify_msg }
  async verify() {
    const id = this.ctx.request.body.problem_id;
    const problem = await this.ctx.model.Problem.findById(id);
    if (!problem) {
      throw new ApiError('问题不存在');
    }

    await problem.update({
      status: this.ctx.request.body.status,
      verify_msg: this.ctx.request.body.verify_msg
    });

    this.ctx.body = '审核成功';
  }

}

module.exports = ProblemController;
