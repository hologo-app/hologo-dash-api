const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("./../config/db.con");

const Lenses = sequelize.define("Lenses", {
  lensID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lensCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lensName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lensGroupID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lensImage: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  activeStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Lenses;
