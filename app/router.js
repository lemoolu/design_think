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
  require('./api/auth.js')(app);
  require('./api/problem.js')(app);
  require('./api/user.js')(app);
};
