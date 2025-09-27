import { truncateByDomain } from 'recharts/types/util/ChartUtils';
import sequelize from '../index';
import { DataTypes } from 'sequelize';
import { FaLaptopHouse } from 'react-icons/fa';

import { Artwork } from './artworks';
import { Game } from './games'
import { User_Game } from './users-games';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
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

// establish relationships
User.belongsToMany(Game, { through: User_Game });
User.hasMany(Artwork);

// synchronize model to the db
(async () => {
  await User.sync({ force: true });
    console.log('User model synchronized successfully.');
})();

export { User };
