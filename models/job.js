'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    requirement: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
    Job.belongsTo(models.Company);
    Job.belongsTo(models.User);
  };
  return Job;
};