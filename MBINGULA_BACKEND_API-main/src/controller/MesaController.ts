import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createMesa = async (req: Request, res: Response) => {
  try {
    const { lugares, posicao } = req.body;

    const mesa = await prisma.mesa.create({
      data: { lugares, posicao },
    });

    return res.json(mesa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllMesas = async (req: Request, res: Response) => {
  try {
    const mesas = await prisma.mesa.findMany({
      select: {
        id: true,
        numero: true,
        lugares: true,
        posicao: true,
        statusOcupacao: true,
        created_at: true,
        updated_at: true
      }
    });
    return res.json(mesas);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getMesaByNumero = async (req: Request, res: Response) => {
  try {
    const numero = req.params.numero;

    const isNumeroExist = await prisma.mesa.findUnique({
      where: {
        numero: parseInt(numero),
      },
    });

    if (!isNumeroExist) {
      return res.status(400).json({
        message: "Esta mesa não existe!",
      });
    }

    const mesa = await prisma.mesa.findUnique({
      where: {
        numero: parseInt(numero),
      },
      select: {
        id: true,
        numero: true,
        lugares: true,
        posicao: true,
        statusOcupacao: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(200).json(mesa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getMesaById = async (req: Request, res: Response) => {
  try {
    const mesaId = req.params.id;

    const mesa = await prisma.mesa.findUnique({
      where: {
        id: mesaId,
      },
      select: {
        id: true,
        numero: true,
        lugares: true,
        posicao: true,
        statusOcupacao: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(200).json(mesa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getMesaByLugares = async (req: Request, res: Response) => {
  try {
    const lugares = req.params.lugares;

    const isLugaresExist = await prisma.mesa.findMany({
      where: {
        lugares: parseInt(lugares),
      },
    });

    if (!isLugaresExist) {
      return res.status(400).json({
        message: "De momento não existe mesa com este número de lugares.",
      });
    }

    const mesa = await prisma.mesa.findMany({
      where: {
        lugares: parseInt(lugares),
      },
      select: {
        id: true,
        numero: true,
        lugares: true,
        posicao: true,
        statusOcupacao: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(200).json(mesa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteMesa = async (req: Request, res: Response) => {
  try {
    const mesaId = req.params.id;

    await prisma.mesa.delete({
      where: {
        id: mesaId,
      },
    });

    return res.json({ message: "mesa deletada!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateMesa = async (req: Request, res: Response) => {
  try {
    const mesaId = req.params.id;
    const { lugares, posicao } = req.body;

    await prisma.mesa.update({
      where: {
        id: mesaId,
      },
      data: {
        lugares, 
        posicao
      },
    });

    return res.json({ message: "mesa Atualizada" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

