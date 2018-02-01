const Sequelize = require('sequelize');
/*const sequelize = new Sequelize('engine4_crud_nodejs', 'engine4_admnflr', 'kidsonline78', {
    host: 'fourengineering.com',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});*/

const sequelize = new Sequelize('mysql://engine4_admnflr:kidsonline78@fourengineering.com:3306/engine4_crud_nodejs', {
    timezone: "Asia/Jakarta",
    logging: true

});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;