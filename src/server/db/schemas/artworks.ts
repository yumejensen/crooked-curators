import sequelize from "../index";
import { DataTypes } from 'sequelize';

import { Ribbon } from "./ribbons"
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
  ribbon_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ribbon,
      key: 'id'
    },
    allowNull: true
  },

  // NOTE : association from User.hasMany(Artwork); and Artwork.belongsTo(Round);
  // adds userId foreign key and roundId foreign key

  round_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Round,
      key: 'id'
    },
    allowNull: true
  },
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: true
  },

});


export { Artwork }
