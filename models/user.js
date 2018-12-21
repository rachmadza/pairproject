'use strict';
const encryptPassword = require('../helpers/secret');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    secret: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: (value) => {
          let generate = encryptPassword(value.password);
          value.password = generate.hash;
          value.secret = generate.secret;
        }
      }
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Job);
  };
  return User;
};