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

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

export default User;