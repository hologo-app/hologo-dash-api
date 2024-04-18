const {Sequelize}  = require("sequelize");

let sequelize;

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL);
  } else {
 sequelize = new Sequelize(
    'hologodb',
    'hologo-admin',
    '0502',{
        host:"localhost",
        dialect:"postgres",
    }
);
  }
sequelize.sync();

(async () =>{
    try {
    await sequelize.authenticate();
    console.log("Connection has been established successfuly.");}
    catch (error){
        console.error("Unable to connect to the database",error);
    }
})();

module.exports = sequelize;