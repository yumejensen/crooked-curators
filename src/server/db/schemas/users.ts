import sequelize from '../index';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }

});

// synchronize model to the db
(async () => {
  await User.sync({ force: true });
    console.log('User model synchronized successfully.');
})();

export { User };