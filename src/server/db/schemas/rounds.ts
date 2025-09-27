import sequelize from '../index';
import { DataTypes } from 'sequelize';

import { Artwork } from './artworks';
import { Game } from './games'

const Round = sequelize.define('round', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  referenceSrc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  referenceName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'game',
    referencesKey: 'id'
  },
  curator_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: 'user',
    referencesKey: 'id'
  },
  winner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: 'user',
    referencesKey: 'id'
  }
});

// establish relationships
Round.belongsTo(Game);
Round.hasMany(Artwork);

(async () => {
  await Round.sync({ force: true });
    console.log('Artwork model synchronized successfully.');
})();

export { Round };
