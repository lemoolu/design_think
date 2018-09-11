'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/problem', controller.problem.index);
  router.get('/story', controller.story.index);

  const api = controller.api;
  router.post('/api/log/in', api.auth.logIn);
  router.post('/api/sign/up', api.auth.signUp);
  router.get('/api/log/out', api.auth.logOut);

  router.resources('problem', '/api/problem', api.problem);
};
