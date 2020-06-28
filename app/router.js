'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const isUserLogin = middleware.isLogin();
  const isAdminLogin = middleware.isLogin(true);

  // 路由配置
  router.get('/', controller.app.index);

  // 用户端接口配置
  router.post('/api/upload', isUserLogin, controller.uploader.index); // 文件上传接口
  router.post('/api/sign/up', controller.login.signUp); // 注册
  router.post('/api/log/in', controller.login.login); // 登录
  router.get('/api/log/out', controller.login.logout); // 登出
  router.get('/api/auth/info', isUserLogin, controller.login.getInfo); // 获取登录用户信息
  router.post('/api/auth/info/update', isUserLogin, controller.login.updateInfo); // 更新登录用户信息
  router.get('/api/auth/get/my/problem', isUserLogin, controller.login.getMyProblem); // 获取与我相关的问题

  router.post('/api/problem', isUserLogin, controller.problem.add); // 添加问题
  router.del('/api/problem', isUserLogin, controller.problem.del); // 删除问题
  router.put('/api/problem', isUserLogin, controller.problem.update); // 编辑问题
  router.get('/api/problem', controller.problem.getById); // 获取问题
  router.get('/api/problem/list', controller.problem.getList); // 获取问题列表


  router.post('/api/problem/star', isUserLogin, controller.problem.userStar); // 用户关注问题
  router.post('/api/solution', isUserLogin, controller.solution.add); // 问题添加解决方案
  router.put('/api/solution', isUserLogin, controller.solution.update); // 问题添加解决方案
  router.get('/api/solution/list', controller.solution.getList); // 解决方案列表
  router.post('/api/solution/vote', isUserLogin, controller.solution.vote); // 用户投票解决方案

  router.post('/api/comment', isUserLogin, controller.comment.add); // 解决方案添加评论
  router.get('/api/comment/list', controller.comment.getList); // 解决方案添加评论
  router.del('/api/comment', isUserLogin, controller.comment.del); // 解决方案添加评论


  // 管理员端接口
  router.post('/api/admin/login', controller.admin.common.login); // 
  router.get('/api/admin/auth/info', isAdminLogin, controller.admin.common.getInfo); // 获取登录用户信息

  router.post('/api/admin/invitecode/gen', isAdminLogin, controller.admin.common.inviteCodeGen); // 生成邀请码
  router.get('/api/admin/invitecode/list', isAdminLogin, controller.admin.common.inviteCodeList); // 生成邀请码

  router.get('/api/admin/problem/list', isAdminLogin, controller.admin.problem.getList); // 
  router.post('/api/admin/problem/verify', isAdminLogin, controller.admin.problem.verify); // 

  router.get('/api/admin/solution/list', isAdminLogin, controller.admin.solution.getList); //  
  router.post('/api/admin/solution/verify', isAdminLogin, controller.admin.solution.verify); //  

  router.get('/api/admin/comment/list', isAdminLogin, controller.admin.comment.getList); //  
  router.post('/api/admin/comment/verify', isAdminLogin, controller.admin.comment.verify); //  

  router.get('/api/admin/user/list', isAdminLogin, controller.admin.user.getList); //  

  router.post('/api/admin/upload', isAdminLogin, controller.uploader.index); // 文件上传接口
  router.post('/api/admin/story', isAdminLogin, controller.admin.story.add); // 
  router.get('/api/admin/story', controller.admin.story.getById); // 
  router.get('/api/admin/story/list', controller.admin.story.getList); // 
  router.del('/api/admin/story', isAdminLogin, controller.admin.story.del); // 
  router.put('/api/admin/story', isAdminLogin, controller.admin.story.update); // 

  // require('./api/problem.js')(app);
  // require('./api/user.js')(app);

  // 管理员端接口
};
