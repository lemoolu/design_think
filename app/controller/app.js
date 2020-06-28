'use strict';
const ApiError = require('../ApiError.js');

const Controller = require('egg').Controller;

class AppController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '';
    // await ctx.render('index.ejs');
  }
}

module.exports = AppController;
