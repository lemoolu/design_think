'use strict';
const moment = require('moment');
const _ = require('lodash');

exports.relativeTime = time =>
  moment(new Date(time * 1000)).fromNow();


// 分页默认参数
const PAGE = { page: 1, pageSize: 30, search: null, };
/**
 * 获取分页数据
 * @param  {[Model]} model           [数据模型]
 * @param  {[Object]} query           [请求参数]
 * @param  {[Sequelize]} Sequelize       [Sequelize]
 * @param  {[String[]]} searchMatchKeys [搜索匹配的属性值]
 * @return {[Object]}                 [数据库查询后的完整数据]
 */
exports.getPageData = async(model, query, Sequelize, searchMatchKeys = []) => {
  const Op = Sequelize.Op;
  const params = Object.assign({}, PAGE, query || {});
  params.page = parseInt(params.page);
  params.pageSize = parseInt(params.pageSize);

  const filterOptions = {
    offset: params.pageSize * (params.page - 1),
    limit: params.pageSize,
    where: {},
  };

  if (params.search) {
    filterOptions.where[Op.or] = [];
    searchMatchKeys.forEach(key => {
      filterOptions.where[Op.or].push({
        [key]: {
          [Op.like]: `%${params.search}%`
        }
      });

    });
  }
  const res = await model.findAndCountAll(filterOptions);
  return {
    page: params.page,
    pageSize: params.pageSize,
    total: res.count,
    list: res.rows
  };
}
