import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createServico = async (req: Request, res: Response) => {
  try {
    const { tipo, descricao } = req.body;

    const servico = await prisma.servicorestaurante.create({
      data: { tipo, descricao },
    });

    return res.json(servico);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllServico = async (req: Request, res: Response) => {
  try {
    const servicos = await prisma.servicorestaurante.findMany();
    return res.json(servicos);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getServicoById = async (req: Request, res: Response) => {
  try {
    const servicoId = req.params.id;

    const mesa = await prisma.servicorestaurante.findUnique({
      where: {
        id: servicoId,
      },
      select: {
        id: true,
        tipo: true,
        descricao: true
      }
    });

    return res.status(200).json(mesa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteServico = async (req: Request, res: Response) => {
  try {
    const servicoId = req.params.id;

    await prisma.servicorestaurante.delete({
      where: {
        id: servicoId,
      },
    });

    return res.json({ message: "Servico deletado!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteAllServico = async (req: Request, res: Response) => {
  try {
    await prisma.servicorestaurante.deleteMany();

    return res.json({ message: "Todos os serviços foram deletadas" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateServico = async (req: Request, res: Response) => {
  try {
    const servicoId = req.params.id;
    const { tipo, descricao } = req.body;

    await prisma.servicorestaurante.update({
      where: {
        id: servicoId,
      },
      data: {
        tipo,
        descricao,
      },
    });

    return res.json({ message: "Servico Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
