'use strict';

const ApiError = require('../ApiError.js');

module.exports = (mustAdmin = false) => {
  return async function(ctx, next) {
    const userId = ctx.session.id;
    const user = await ctx.model.User.findById(userId);

    if (!user || !!user.is_admin !== mustAdmin) {
      throw new ApiError('未登录', 203);
    }

    ctx.user = user.dataValues;
    await next();
  }
}
