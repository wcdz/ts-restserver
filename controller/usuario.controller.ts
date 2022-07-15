import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll({
    where: {
      estado: true,
    },
  }); // findAll() -> ignora el estado, retorna todo
  res.json({ usuarios });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  if (!usuario)
    return res
      .status(404)
      .json({ msg: `No existe un usuarios con el id ${id}` });

  res.json({ usuario });
};

export const postUsuario = async (req: Request, res: Response) => {
  const { nombre, email } = req.body;

  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (existeEmail) {
      return res
        .status(400)
        .json({ msg: `Ya existe un usuario con el email ${email}` });
    }

    const usuario = Usuario.build({ nombre, email });
    await usuario.save();

    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el admin",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`,
      });
    }

    await usuario.update(data);

    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el admin",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      msg: `No existe un usuario con el id ${id}`,
    });
  }

  // Eliminacion Fisica
  // await usuario.destroy();

  // Eliminacion Logica
  await usuario.update({ estado: false });

  res.json({ msg: "Usuario Eliminado", usuario });
};
