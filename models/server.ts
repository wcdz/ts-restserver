import express, { Application } from "express";
import usuariosRoutes from "../routes/usuario.routes";
import cors from "cors";

import db from "../db/connection";

class Server {
  private app: Application;
  private port: any;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Metodos iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DB -> Ok");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura del Body -> Permitir al express leer json
    this.app.use(express.json());

    // Carpeta Publica [Opcional]
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, usuariosRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server -> Ok :: ${this.port}`);
    });
  }
}

export default Server;
