import sequelize from "../index";
import { DataTypes } from 'sequelize';

import { Round } from "./rounds";

const Artwork = sequelize.define('artwork', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  artworkSrc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  round_id: {
    type: DataTypes.INTEGER,
    references: 'rounds',
    referencesKey: 'id',
    allowNull: false
  },
  artist_id: {
    type: DataTypes.INTEGER,
    references: 'users',
    referencesKey: 'id',
    allowNull: false
  },
  // ribbon_id: {
  //   type: DataTypes.INTEGER,
  //   references: 'ribbons',
  //   referencesKey: 'id',
  //   allowNull: true
  // }
});

// establish relationships
Artwork.belongsTo(Round);

// synchronize model to the db
(async () => {
  await Artwork.sync({ force: true });
    console.log('Artwork model synchronized successfully.');
})();

export { Artwork };
