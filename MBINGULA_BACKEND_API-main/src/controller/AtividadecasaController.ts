import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createAtividadeCasa = async (req: Request, res: Response) => {
  try {
    const { tema, data, hora, descricao } = req.body;

    const atividadecasa = await prisma.atividadecasa.create({
      data: { tema, data, hora, descricao },
    });

    return res.json(atividadecasa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllAtividadesCasa = async (req: Request, res: Response) => {
  try {
    const atividadescasa = await prisma.atividadecasa.findMany();
    return res.json(atividadescasa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAtividadeCasa = async (req: Request, res: Response) => {
  try {
    const atividadeCasaId = req.params.id;

    const atividadecasa = await prisma.atividadecasa.findUnique({
      where: {
        id: atividadeCasaId,
      },
    });

    if (!atividadecasa) {
      return res.status(204);
    }

    return res.status(200).json(atividadecasa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteAtividadeCasa = async (req: Request, res: Response) => {
  try {
    const atividadecasaId = req.params.id;

    await prisma.atividadecasa.delete({
      where: {
        id: atividadecasaId,
      },
    });

    return res.json({ message: "atividade deletada!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateAtividadeCasa = async (req: Request, res: Response) => {
  try {
    const atividadecasaId = req.params.id;
    const { tema, data, hora, descricao } = req.body;

    await prisma.atividadecasa.update({
      where: {
        id: atividadecasaId,
      },
      data: {
        tema, data, hora, descricao
      },
    });

    return res.json({ message: "atividade Atualizada" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

