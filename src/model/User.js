const { DataTypes } = require("sequelize");
const sequelize = require("./../config/db.con");

const User = sequelize.define("User", {
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
  refreshToken: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

module.exports = User;
