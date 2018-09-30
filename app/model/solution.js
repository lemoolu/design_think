'use strict';

const ApiError = require('../ApiError.js');

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Solution = app.model.define('solutions', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    problem_id: {
      type: INTEGER,
      allowNull: false,
    },
    content: TEXT,
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    vote_ids: TEXT,
  }, {
    indexes: [
      { unique: true, fields: ['id'] }
    ],
    paranoid: false,
  });

  return Solution;
};
