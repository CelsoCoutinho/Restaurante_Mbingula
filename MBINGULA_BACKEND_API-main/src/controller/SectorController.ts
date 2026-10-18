import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createSector = async (req: Request, res: Response) => {
  try {
    const { name, descricao } = req.body;

    const sector = await prisma.sector.create({
      data: { name, descricao },
    });

    return res.json(sector);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllSectores = async (req: Request, res: Response) => {
  try {
    const sectores = await prisma.sector.findMany();
    return res.json(sectores);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getSector = async (req: Request, res: Response) => {
  try {
    const sectorId = req.params.id;

    const sector = await prisma.sector.findUnique({
      where: {
        id: sectorId,
      },
      select: {
        id: true,
        name: true,
        descricao: true,
      },
    });

    if (!sector) {
      return res.status(204);
    }

    return res.status(200).json(sector);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteSector = async (req: Request, res: Response) => {
  try {
    const sectorId = req.params.id;

    await prisma.sector.delete({
      where: {
        id: sectorId,
      },
    });

    return res.json({ message: "Sector deletado!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateSector = async (req: Request, res: Response) => {
  try {
    const sectorId = req.params.id;
    const { name, descricao } = req.body;

    await prisma.sector.update({
      where: {
        id: sectorId,
      },
      data: {
        name,
        descricao,
      },
    });

    return res.json({ message: "Sector Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
