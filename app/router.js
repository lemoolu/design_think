'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 路由配置
  router.get('/', controller.home.index);
  router.get('/problem', controller.problem.index);
  router.get('/story', controller.story.index);

  // 接口配置
  const api = controller.api;
  router.post('/api/log/in', api.auth.logIn);
  router.post('/api/sign/up', api.auth.signUp);
  router.get('/api/log/out', api.auth.logOut);
  router.get('/api/auth/info', api.auth.info);

  router.resources('problem', '/api/problem', api.problem);
};
