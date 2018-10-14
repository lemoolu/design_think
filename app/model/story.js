'use strict';

const ApiError = require('../ApiError.js');
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Story = app.model.define('storys', {
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
    visit_count: INTEGER,
    star_ids: { type: TEXT, defaultValue: '' },
    image: STRING,
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
    deleted_at: DATE,
  }, {
    indexes: [
      { unique: true, fields: ['id'] }
    ],
  });

  Story.tryCreate = async (data) => {
    return await Story.create(data);
  }

  return Story;
};
