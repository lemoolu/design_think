'use strict';

const Controller = require('egg').Controller;

class ApiProblemController extends Controller {

  // https://eggjs.org/zh-cn/basics/router.html#restful-%E9%A3%8E%E6%A0%BC%E7%9A%84-url-%E5%AE%9A%E4%B9%89
  /**
   * get /api/problem 问题列表
   */
  async index() {
    this.ctx.body = 'hi, problem';
  }

  /**
   * post /api/problem 问题创建
   */
  async create() {
    const ctx = this.ctx;
    ctx.body = 'create';
    ctx.status = 200;
  }

  /**
   * get /api/problem/:id 问题详情
   */
  async show() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    ctx.body = await ctx.service.problem.find(userId);
  }

  /**
   * put /api/problem/:id 问题更新
   */
  async update() {
    const ctx = this.ctx;
    ctx.body = 'update';
  }

  /**
   * delete /api/problem/:id 问题删除
   */
  async destroy() {
    this.ctx.body = 'destroy';
  }


}

module.exports = ApiProblemController;
