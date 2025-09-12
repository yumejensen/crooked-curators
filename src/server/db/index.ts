const { Sequelize } = require('sequelize')

// when making db locally, name it "crooked_curators"

// -------INITIALIZE SEQUELIZE--------

// initializing sequelize with database at localhost
const sequelize = new Sequelize('crooked_curators', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// checks if connection to DB was successful
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })

export default sequelize;
