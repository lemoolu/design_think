// 'use strict';

// const Service = require('egg').Service;

// const UserType = {
//   nickname: { type: 'string' },
//   phone: { type: 'string', max: 11, min: 11 },
// };


// class UserService extends Service {
//   async insert(data) {
//     this.ctx.validate(UserType);
//     // 判断是否已经注册
//     let existUser = await this.app.mysql.get('user', { phone: data.phone });
//     if (existUser) {
//       throw new Error('该手机号已注册');
//     }
//     existUser = await this.app.mysql.get('user', { nickname: data.nickname });
//     if (existUser) {
//       throw new Error('用户名已存在');
//     }
//     const user = await this.app.mysql.insert('user', data);
//     return user;
//   }

//   async get(id) {
//     const res = await this.app.mysql.get('user', { id });
//     delete res.is_del;
//     return res;
//   }
// }

// module.exports = UserService;
