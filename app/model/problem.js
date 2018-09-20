'use strict';

const ApiError = require('../ApiError.js');

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
    status: INTEGER,
    prototype_link: STRING,
    votes_count: INTEGER,
    visit_count: INTEGER,
    follow_count: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    deleted_at: DATE,
  }, {
    indexes: [
      { unique: true, fields: ['id'] }
    ],
  });

  Problem.tryCreate = async(data) => {
    return await Problem.create(data);
  }

  return Problem;
};
