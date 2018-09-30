'use strict';

const ApiError = require('../ApiError.js');

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
  }, {
    indexes: [
      { unique: true, fields: ['id'] }
    ],
    paranoid: false,
  });

  return Comment;
};
