'use strict';

const ApiError = require('../ApiError.js');

module.exports = app => {
  const { router, controller } = app;

  router.post('/api/log/in', async(ctx) => {
    const data = ctx.request.body;
    const user = await ctx.model.User.findOne({
      where: { phone: data.phone, password: data.password }
    });

    if (!user) {
      ctx.session = null;
      throw new ApiError('手机号或密码错误');
    } else {
      ctx.session.id = user.id;
      ctx.body = '登陆成功';
    }
  });

  router.post('/api/sign/up', async(ctx) => {
    const data = ctx.request.body;
    const res = await ctx.model.User.tryCreate(data);
    ctx.body = res.dataValues;
  });

  router.get('/api/log/out', async(ctx) => {
    ctx.session = null;
    ctx.redirect('/');
  });

  router.get('/api/auth/info', async(ctx) => {
    const userId = ctx.session.id;
    const user = await ctx.model.User.findById(userId);
    console.log('0000')
    console.log(user)
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 401;
      throw new ApiError('未登录', 401);
    }
  });
}
