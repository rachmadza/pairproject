'use strict';
const encryptPassword = require('../helpers/secret');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
          msg: 'Please input valid email'
        },
        isUnique: function (value) {
          return Teacher.findOne({
            where: {
              email: value,
              id: { [Op.ne]: this.id }
            }
          })

            .then((result) => {
              if (result) throw new Error('email already registered')
            })
            .catch((err) => {
              throw err
            });
        }
      }
    },
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