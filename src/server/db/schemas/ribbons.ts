import sequelize from "../index";
import { DataTypes } from 'sequelize';

const Ribbon = sequelize.define('ribbon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export { Ribbon };
