import { Router } from "express";
import { putUsuario, deleteUsuario } from "../controller/usuario.controller";
import {
  getUsuario,
  getUsuarios,
  postUsuario,
} from "../controller/usuario.controller";

const router = Router();

// Rutas
router.get("/", getUsuarios);
router.get("/:id", getUsuario);
router.post("/", postUsuario);
router.put("/:id", putUsuario);
router.delete("/:id", deleteUsuario);

export default router;
