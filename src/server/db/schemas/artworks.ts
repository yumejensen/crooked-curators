import sequelize from "../index";
import { DataTypes } from 'sequelize';

import { Round } from "./rounds";
import { User } from "./users";

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
    references: {
      model: Round,
      key: 'id'
    },
    allowNull: false
  },
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  // ribbon_id: {
  //   type: DataTypes.INTEGER,
  //   references: 'ribbons',
  //   referencesKey: 'id',
  //   allowNull: true
  // }
});

// synchronize model to the db
(async () => {
  await Artwork.sync();
    console.log('Artwork model synchronized successfully.');
})();

export { Artwork };
