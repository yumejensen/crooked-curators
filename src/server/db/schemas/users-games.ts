import sequelize from "../index";
import { DataTypes } from "sequelize";

import { User } from "./users";
import { Game } from './games'

const User_Game = sequelize.define('user_game', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  game_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: 'id'
    },
    allowNull: false
  },
}, { timestamps: true });


export { User_Game };
