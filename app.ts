import dotenv from "dotenv";
import Server from "./models/server";

// Configuraciones
dotenv.config();

// Instancia del servidor
const server = new Server();

server.listen();
