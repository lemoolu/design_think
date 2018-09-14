'use strict';

const ApiError = require('../ApiError.js');

const PAGE = {
  page: 1,
  pageSize: 30
};

const APIURL = '/api/problem';

module.exports = app => {
  const { router, controller } = app;

  /**
   * 创建 { titlte, content }
   */
  router.post(APIURL, async(ctx) => {
    const data = ctx.request.body;
    const res = await ctx.model.Problem.tryCreate(data);
    ctx.body = res.dataValues;
  });

  /**
   * 更新
   */
  router.put(APIURL, async(ctx) => {
    const data = ctx.request.body;
    const problem = await ctx.model.Problem.findById(data.id);
    if (!problem) {
      throw new ApiError('问题不存在');
    }
    ctx.body = await problem.update(data);
  });

  /**
   * 删除 ?id
   */
  router.delete(APIURL, async(ctx) => {
    const problem = await ctx.model.Problem.findById(ctx.query.id);
    if (!problem) {
      throw new ApiError('问题不存在')
    }
    await problem.destroy();
    ctx.body = '问题删除成功';
  });


  /**
   * 详情 ?id
   */
  router.get(APIURL, async(ctx) => {
    const id = ctx.query.id;
    ctx.body = await ctx.model.Problem.findById(id);
  });

  /**
   * /api/problem/list 列表 ?page&pageSize
   */
  router.get(APIURL + '/list', async(ctx) => {
    const res = await ctx.helper.getPageData(ctx.model.Problem, ctx.query, app.Sequelize, ['title']);
    ctx.body = res
  });

}
