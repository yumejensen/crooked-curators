import sequelize from '../index';
import { DataTypes } from 'sequelize';

import { User } from './users';

const Game = sequelize.define('game', {
    gameCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

User.hasMany(Game)


(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

export { Game };