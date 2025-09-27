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

// establish relationships
Game.belongsToMany(User, { through: User_Game });

// synchronize model to the db
(async () => {
  await Game.sync({ alter: true });
  console.log("Game model synchronized successfully.");
  // console.log(sequelize.models)
})();

export { Game };
