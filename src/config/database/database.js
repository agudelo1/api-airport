import { Sequelize } from "sequelize";
import { envs } from "../env/env.js";

const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully. 😎");
  } catch (error) {
    throw new Error("Error al autenticar: " + error); // Corrección aquí
  }
}

export async function syncUp() {
  try {
    await sequelize.sync();
    console.log("Connection has been synced successfully. 😎");
  } catch (error) {
    throw new Error("Error al sincronizar: " + error); // Corrección aquí
  }
}

export default sequelize;
