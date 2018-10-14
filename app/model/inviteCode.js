'use strict';

const ApiError = require('../ApiError.js');

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const rel = app.model.define('invite_code', {
    id: {
      type: STRING,
      primaryKey: true,
    },
    create_user_id: {
      type: INTEGER,
      allowNull: false,
    },
    use_user_id: {
      type: INTEGER,
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
