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
      image: data.image,
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
      content: data.content,
      status: null,
    });
  }

  async getById() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const _problem = await ctx.model.Problem.findById(id);
    if (!_problem) {
      throw new ApiError('问题不存在');
    }
    const problem = _problem.get();
    problem.user_data = await ctx.model.User.findById(problem.user_id);
    problem.star_count = ctx.helper.strToIds(problem.star_ids).length;
    await _problem.update({
      visit_count: problem.visit_count + 1
    }, { silent: true });

    ctx.body = problem;
  }

  async getList() {
    const ctx = this.ctx;
    const problemList = await ctx.service.common.getPageData(ctx.model.Problem, ctx.query, {
      searchKey: ['title'],
      withUser: true,
      attributes: {
        // exclude: ['content']
      },
      order: [
        ['created_at', 'DESC']
      ]
    });

    problemList.list.forEach(x => {
      x.star_count = ctx.helper.strToIds(x.star_ids).length
    });

    ctx.body = problemList;
  }

  async del() {
    const ctx = this.ctx;
    await ctx.service.common.delData(ctx.model.Problem, ctx.request.body.id, { isNeedOwer: true }, {});
  }

  // 用户关注问题 post { problem_id }
  async userStar() {
    const { ctx } = this;
    if (!ctx.request.body.problem_id) {
      throw new ApiError('请传入问题id');
    }
    const problem = await ctx.model.Problem.findById(ctx.request.body.problem_id);
    if (!problem) {
      throw new ApiError('问题不存在')
    }
    if (problem.user_id === ctx.user.id) {
      throw new ApiError('无法关注该问题，此问题属于您');
    }
    if (ctx.helper.strHasId(problem.star_ids, ctx.user.id)) {
      throw new ApiError('您已关注过该问题');
    }

    await ctx.service.common.relUserStarProblem(ctx.request.body.problem_id);

    await problem.update({
      star_ids: ctx.helper.strAddId(problem.star_ids, ctx.user.id),
    });

    ctx.body = '问题关注成功';
  }

}

module.exports = ProblemController;
