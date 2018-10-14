'use strict';

const ApiError = require('../ApiError.js');
const statusType = { 1: true, 0: false };
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Comment = app.model.define('comments', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    solution_id: {
      type: INTEGER,
      allowNull: false,
    },
    content: TEXT,
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DATE,
      get() {
        return this.getDataValue('created_at') ?
          moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm') : '';
      }
    },
    updated_at: {
      type: DATE,
      get() {
        return this.getDataValue('updated_at') ?
          moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm') : '';
      }
    },
    status: {
      type: INTEGER,
      get() {
        return statusType[this.getDataValue('status')]
      },
      set(val) {
        if (val === true || val === 'true') {
          this.setDataValue('status', 1);
        }
        if (val === false || val === 'false') {
          this.setDataValue('status', 0);
        }
      }
    },
    verify_msg: STRING,
  }, {
    indexes: [
      { unique: true, fields: ['id'] }
    ],
    paranoid: false,
  });

  return Comment;
};
