'use strict';

const Service = require('egg').Service;

class ProblemService extends Service {
  async find(id) {
    // const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    const user = {
      name: 2222,
    };
    return user;
  }
}

module.exports = ProblemService;
