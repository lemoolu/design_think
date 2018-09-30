'use strict';

const ApiError = require('../ApiError.js');

module.exports = () => {
  return async function(ctx, next) {
    const userId = ctx.session.id;
    const user = await ctx.model.User.findById(userId);
    if (!user) {
      throw new ApiError('未登录', 203);
    }

    ctx.user = user;
    await next();
  }
}
