'use strict';

const ApiError = require('../ApiError.js');
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const rel = app.model.define('invite_code', {
    id: {
      type: STRING,
      primaryKey: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    use_user_id: {
      type: INTEGER,
    },
    created_at: {
      type: DATE,
      get() {
        return this.getDataValue('created_at') ?
          moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss') : '';
      },
    },
  }, {
    indexes: [
      { unique: true, fields: ['id'] }
    ],
    paranoid: false,
    timestamps: false,
  });

  return rel;
};
