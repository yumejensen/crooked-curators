import sequelize from "../index";
import { DataTypes } from "sequelize";

import { User } from "./users";
import { User_Game } from './users-games';

const Game = sequelize.define("game", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  gameCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// synchronize model to the db
(async () => {
  await Game.sync();
  console.log("Game model synchronized successfully.");
  // console.log(sequelize.models)
})();

export { Game };
