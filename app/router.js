'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const isUserLogin = middleware.isLogin();

  // 路由配置
  router.get('/', controller.app.index);

  // 用户端接口配置
  router.post('/api/upload', isUserLogin, controller.uploader.index); // 文件上传接口
  router.post('/api/sign/up', controller.login.signUp); // 注册
  router.post('/api/log/in', controller.login.login); // 登录
  router.get('/api/log/out', controller.login.logout); // 登出
  router.get('/api/auth/info', isUserLogin, controller.login.getInfo); // 获取登录用户信息
  router.post('/api/auth/info/update', isUserLogin, controller.login.updateInfo); // 更新登录用户信息

  router.post('/api/problem', isUserLogin, controller.problem.add); // 添加问题
  router.del('/api/problem', isUserLogin, controller.problem.del); // 删除问题
  router.put('/api/problem', isUserLogin, controller.problem.updata); // 编辑问题
  router.get('/api/problem', isUserLogin, controller.problem.getById); // 获取问题
  router.get('/api/problem/list', isUserLogin, controller.problem.getList); // 获取问题列表


  router.post('/api/problem/star', isUserLogin, controller.problem.userStar); // 用户关注问题
  router.post('/api/solution', isUserLogin, controller.solution.add); // 问题添加解决方案
  router.post('/api/comment', isUserLogin, controller.comment.add); // 解决方案添加评论
  router.post('/api/solution/vote', isUserLogin, controller.solution.vote); // 用户投票解决方案

  // require('./api/problem.js')(app);
  // require('./api/user.js')(app);

  // 管理员端接口
};
