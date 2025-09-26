import sequelize from "../index";
import { DataTypes } from "sequelize";

import { User } from "./users";

const Game = sequelize.define("game", {
  gameCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Game.belongsToMany(User, { through: "users_games" });

// synchronize model to the db
(async () => {
  await Game.sync({ alter: true });
  console.log("Game model synchronized successfully.");
  // console.log(sequelize.models)
})();

export { Game };
