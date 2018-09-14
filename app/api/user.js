'use strict';

const ApiError = require('../ApiError.js');

const PAGE = {
  page: 1,
  pageSize: 30,
  search: null,
};

const APIURL = '/api/user';

module.exports = app => {
  const { router, controller } = app;
  const Op = app.Sequelize.Op

  /**
   * 创建 { phone, password }
   */
  router.post(APIURL, async(ctx) => {
    const data = ctx.request.body;
    const res = await ctx.model.User.tryCreate(data);
    ctx.body = res.dataValues;
  });

  /**
   * 更新
   */
  router.put(APIURL, async(ctx) => {
    const data = ctx.request.body;
    const problem = await ctx.model.User.findById(data.id);
    if (!problem) {
      throw new ApiError('用户不存在');
    }
    ctx.body = await problem.update(data);
  });

  /**
   * 删除 ?id
   */
  router.delete(APIURL, async(ctx) => {
    const problem = await ctx.model.User.findById(ctx.query.id);
    if (!problem) {
      throw new ApiError('用户不存在')
    }
    await problem.destroy();
    ctx.body = '用户删除成功';
  });


  /**
   * 详情 ?id
   */
  router.get(APIURL, async(ctx) => {
    const id = ctx.query.id;
    ctx.body = await ctx.model.User.findById(id);
  });

  /**
   * /api/user/list 列表 ?page&pageSize
   */
  router.get(APIURL + '/list', async(ctx) => {
    const res = await ctx.helper.getPageData(ctx.model.User, ctx.query, app.Sequelize, ['phone', 'name']);
    ctx.body = res;
  });

}
