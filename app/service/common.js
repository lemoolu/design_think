'use strict';
const _ = require('lodash');
const Service = require('egg').Service;
const ApiError = require('../ApiError.js');

// 分页默认参数
const PAGE = { page: 1, pageSize: 10, search: null, };
/**
 * 获取分页数据
 * @param  {[Model]} model           [数据模型]
 * @param  {[Object]} query           [请求参数]
 * @param  {[Object[]]} options [搜索匹配的属性值]
 * @return {[Object]}                 [数据库查询后的完整数据]
 */
class CommonService extends Service {
  async getPageData(model, query = {}, options = { searchKey: [], withUser: true, where: {}, order: undefined, attributes: undefined }) {
    const ctx = this.ctx;
    const Op = this.ctx.app.Sequelize.Op;

    const params = Object.assign({}, PAGE, query);
    params.page = parseInt(params.page);
    params.pageSize = parseInt(params.pageSize);

    const filterOptions = {
      offset: params.pageSize * (params.page - 1),
      limit: params.pageSize,
      where: {},
    };

    if (params.search) {
      filterOptions.where[Op.or] = [];
      _.get(options, 'searchKey', []).forEach(key => {
        filterOptions.where[Op.or].push({
          [key]: {
            [Op.like]: `%${params.search}%`
          }
        });
      });
    }

    if (options.where) {
      Object.assign(filterOptions.where, options.where);
    }

    filterOptions.attributes = options.attributes;
    filterOptions.order = options.order;

    let list = await model.findAll(filterOptions);
    list = list.map(x => x.dataValues);

    if (options.withUser === true) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const userData = await ctx.model.User.findById(item.user_id);
        item.user_data = {
          id: userData.id,
          name: userData.name,
          avatar: userData.avatar,
        };
      }
    }

    return {
      page: params.page,
      pageSize: params.pageSize,
      total: await model.count(filterOptions),
      list: list
    };
  }

  async delData(model, delId, options = { isNeedOwer: true }, messages = {}) {
    messages = Object.assign({
      success: '删除成功',
      fail: '删除失败',
      notExist: '数据不存在',
      noPermission: '当前用户无权限操作',
    }, messages)
    const ctx = this.ctx;
    const data = await model.findById(delId);
    if (!data) {
      throw new ApiError(messages.notExist)
    }

    if (options.isNeedOwer === true) {
      if (data.user_id !== ctx.user.id) {
        throw new ApiError(messages.noPermission);
      }
    }

    await data.destroy();
    ctx.body = messages.success;
  }
}

module.exports = CommonService;
