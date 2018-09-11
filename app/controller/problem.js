'use strict';

const Controller = require('egg').Controller;

class ProblemController extends Controller {
  async index() {
    const { ctx } = this;
    // this.ctx.body = 'hi, problem';
    await ctx.render('pro.ejs');
  }
}

module.exports = ProblemController;
