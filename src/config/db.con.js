const {Sequelize}  = require("sequelize");

const sequelize = new Sequelize(
    'hologodb',
    'postgres',
    '0502',{
        host:"localhost",
        dialect:"postgres",
    }
);

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