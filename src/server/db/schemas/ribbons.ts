import sequelize from "../index";
import { DataTypes } from 'sequelize';

const Ribbon = sequelize.define('ribbon'. {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
})

export { Ribbon };
