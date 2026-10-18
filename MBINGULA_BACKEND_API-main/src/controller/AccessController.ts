import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const getAllAccessess = async (req: Request, res: Response) => {
  try {
    const accessess = await prisma.access.findMany();
    return res.json(accessess);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAccessById = async (req: Request, res: Response) => {
  try {
    const accessId = req.params.id;

    const access = await prisma.access.findUnique({
      where: {
        id: accessId,
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!access) {
      return res.status(204);
    }

    return res.status(200).json(access);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const createAccess = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const access = await prisma.access.create({
      data: { name },
    });

    return res.json(access);
  } catch (error) {
    return res.status(400).json(error);
  }
};