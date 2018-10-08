'use strict';

const ApiError = require('../ApiError.js');

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const rel = app.model.define('rel_user_problem', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    star_ids: TEXT,
    join_ids: TEXT,
  }, {
    indexes: [
      { unique: true, fields: ['id'] }
    ],
    paranoid: false,
  });

  return rel;
};
