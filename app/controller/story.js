'use strict';

const Controller = require('egg').Controller;

class StoryController extends Controller {
  async index() {
    const { ctx } = this;
    // this.ctx.body = 'hi, problem';
    await ctx.render('pro.jsx');
  }
}

module.exports = StoryController;
