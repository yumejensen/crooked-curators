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


export { Game };
