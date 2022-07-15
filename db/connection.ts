import { Sequelize } from "sequelize";

const db = new Sequelize("curso-node-ts", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  // logging: false
});

export default db;
