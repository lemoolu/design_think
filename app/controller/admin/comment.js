'use strict';
const ApiError = require('../../ApiError.js');

const Controller = require('egg').Controller;

class Comment extends Controller {
  // { status, search page, pageSize}
  async getList() {
    const ctx = this.ctx;
    const option = {
      searchKey: ['content'],
      withUser: true,
      status: ctx.query.status,
      where: {},
      attributes: {
        // exclude: ['content']
      },
      order: [
        ['created_at', 'DESC']
      ]
    }
    const data = await ctx.service.common.getPageData(ctx.model.Comment, ctx.query, option);
    ctx.body = data;
  }

  // 解决方案审核 post { comment_id, status, verify_msg }
  async verify() {
    const id = this.ctx.request.body.comment_id;
    const solution = await this.ctx.model.Comment.findById(id);
    if (!solution) {
      throw new ApiError('评论不存在');
    }
    await solution.update({
      status: this.ctx.request.body.status,
      verify_msg: this.ctx.request.body.verify_msg
    });
    this.ctx.body = '审核成功';
  }

}

module.exports = Comment;
