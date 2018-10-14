'use strict';
const ApiError = require('../../ApiError.js');
const Controller = require('egg').Controller;


class Ctrl extends Controller {
  async add() {
    const { ctx, app } = this;
    const data = ctx.request.body;

    app.validate({
      title: {
        required: true,
        messages: {
          required: '请填写标题',
        }
      },
      content: {
        required: true,
        messages: '请填写内容',
      }
    }, ctx.request.body);

    const res = await ctx.model.Story.tryCreate({
      title: data.title,
      content: data.content,
      image: data.image,
      user_id: ctx.user.id
    });
    ctx.body = res;
  }

  async update() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const story = await ctx.model.Story.findById(data.id);
    if (!story) {
      throw new ApiError('故事不存在');
    }
    ctx.body = await story.update({
      title: data.title, // todo 是否可以编辑标题
      content: data.content
    });
  }

  async getById() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const _story = await ctx.model.Story.findById(id);
    if (!_story) {
      throw new ApiError('故事不存在');
    }
    const story = _story.dataValues;
    story.user_data = await ctx.model.User.findById(story.user_id);
    story.star_count = ctx.helper.strToIds(story.star_ids).length;
    // await _story.update({
    //   visit_count: story.visit_count + 1
    // });

    ctx.body = story;
  }

  async getList() {
    const ctx = this.ctx;
    const list = await ctx.service.common.getPageData(ctx.model.Story, ctx.query, {
      searchKey: ['title'],
      withUser: false,
      attributes: {
        // exclude: ['content']
      },
      order: [
        ['created_at', 'DESC']
      ]
    });

    list.list.forEach(x => {
      x.star_count = ctx.helper.strToIds(x.star_ids).length
    });

    ctx.body = list;
  }

  async del() {
    const ctx = this.ctx;
    await ctx.service.common.delData(ctx.model.Story, ctx.request.body.id, { isNeedOwer: false }, {});
    ctx.body = '故事删除成功'
  }

}

module.exports = Ctrl;
