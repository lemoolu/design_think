'use strict';

const ApiError = require('../ApiError.js');
const moment = require('moment');

const statusType = { 1: true, 0: false };

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Problem = app.model.define('problems', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    content: TEXT,
    desc: STRING,
    user_id: INTEGER,
    rate: INTEGER,
    prototype_link: STRING,
    visit_count: INTEGER,
    star_ids: { type: TEXT, defaultValue: '' },
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
        return this.getDataValue('created_at') ?
          moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm') : '';
      }
    },
    deleted_at: DATE,
    image: STRING,
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
  });

  Problem.tryCreate = async (data) => {
    return await Problem.create(data);
  }

  return Problem;
};
