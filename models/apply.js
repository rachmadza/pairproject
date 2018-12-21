'use strict';
module.exports = (sequelize, DataTypes) => {
  const Apply = sequelize.define('Apply', {
    UserId: DataTypes.INTEGER,
    JobId: DataTypes.INTEGER
  }, {});
  Apply.associate = function(models) {
    // associations can be defined here
    Apply.belongsTo(models.User);
    Apply.belongsTo(models.Job);
  };
  return Apply;
};