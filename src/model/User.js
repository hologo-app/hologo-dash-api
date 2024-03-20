const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Users = sequelize.define("Users", {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  usertype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accesslevel : {
    type:DataTypes.STRING,
    allowNull:false,
  },
  refreshtoken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Users;
