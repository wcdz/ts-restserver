import { DataTypes } from "sequelize";
import db from "../db/connection";

const Usuario = db.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  estado: {
    type: DataTypes.BOOLEAN, // Sequelize se encarga de transformar el estado entre 0 : false y 1 : true
    defaultValue: true,
  },
});

export default Usuario;
