import sequelize from "../index";
import { DataTypes } from "sequelize";

import { User } from "./users";
import { Game } from './games'

const User_Game = sequelize.define('user_game', {
  joinedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
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
}, { timestamps: false });

// synchronize model to the db
(async () => {
  await User_Game.sync();
    console.log('User_Game model synchronized successfully.');
})();

export { User_Game };
