import sequelize from '../index';
import { DataTypes } from 'sequelize';

import { Game } from './games'
import { User } from './users';

const Round = sequelize.define('round', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true
  },
  referenceSrc: {
    type: DataTypes.STRING,
    allowNull: true
  },
  referenceName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Game,
      key: 'id'
    }
  },
  curator_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  winner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  }
});


export { Round };
