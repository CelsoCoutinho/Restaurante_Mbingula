import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createAvaliacao = async (req: Request, res: Response) => {
  try {
    const { assunto, descricao } = req.body;

    const avaliacao = await prisma.avaliacao.create({
      data: { assunto, descricao },
    });

    return res.json(avaliacao);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllAvaliacao = async (req: Request, res: Response) => {
  try {
    const avaliacoes = await prisma.avaliacao.findMany();
    return res.json(avaliacoes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteAvaliacao = async (req: Request, res: Response) => {
  try {
    const avaliacaoId = req.params.id;

    await prisma.avaliacao.delete({
      where: {
        id: avaliacaoId,
      },
    });

    return res.json({ message: "Avaliacao deletado!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteAllAvaliacao = async (req: Request, res: Response) => {
  try {

    await prisma.avaliacao.deleteMany();

    return res.json({ message: "Todas avaliações deletadas" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateAvaliacao = async (req: Request, res: Response) => {
  try {
    const avaliacaoId = req.params.id;
    const { assunto, descricao } = req.body;

    await prisma.avaliacao.update({
      where: {
        id: avaliacaoId,
      },
      data: {
        assunto,
        descricao,
      },
    });

    return res.json({ message: "Avaliação atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};