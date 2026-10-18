import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createItemCardapio = async (req: Request, res: Response) => {
  try {
    const { name, price, categoria } = req.body;
    const requestImage = req.files as Express.Multer.File[];

    const images = requestImage.map(Image => {
       return {
         path: Image.filename,
       }
    });

    const isItemCardapioName = await prisma.itemCardapio.findUnique({
      where: {
        name,
      },
    });

    if (isItemCardapioName) {
      return res
        .status(400)
        .json({ message: "Este item já existe no cardapio!" });
    }

    const itemCardapio = await prisma.itemCardapio.create({
      data: { 
        name, 
        price, 
        categoria,
        Image: {
          create: images,
        }
      },
      select: {
        id: true,
        name: true,
        price: true, 
        categoria: true,
        Image: true
      }
    });

    return res.json(itemCardapio);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getItemCardapio = async (req: Request, res: Response) => {
  try {
    const itemsCardapio = await prisma.itemCardapio.findMany({
      select: {
        id: true,
        name: true,
        price: true, 
        categoria: true,
        disponivel: true,
        Image: true,
        created_at: true,
        updated_at: true
      }
    });
    return res.json(itemsCardapio);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getItemCardapioByPriceInterval = async (
  req: Request,
  res: Response
) => {
  try {
    const min = req.params.price_min;
    const max = req.params.price_max;

    const itemCardapio = await prisma.itemCardapio.findMany({
      where: {
        price: {
          gte: min,
          lte: max,
        },
      },
      select: {
        id: true,
        name: true,
        price: true, 
        categoria: true,
        disponivel: true,
        Image: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!itemCardapio) {
      return res.status(204);
    }

    return res.status(200).json(itemCardapio);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteItemCardapio = async (req: Request, res: Response) => {
  try {
    const itemCardapioId = req.params.id;

    await prisma.image.deleteMany({
      where: {
        itemCardapioId: itemCardapioId,
      },
    });

    await prisma.itemCardapio.delete({
      where: {
        id: itemCardapioId,
      },
    });

    return res.json({ message: "Item do Cardápio deletado!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateItemCardapio = async (req: Request, res: Response) => {
  try {
    const itemCardapioId = req.params.id;
    const { name, price, categoria, disponivel } = req.body;

    await prisma.itemCardapio.update({
      where: {
        id: itemCardapioId,
      },
      data: { name, price, categoria, disponivel },
    });

    return res.json({ message: "Item do Cardápio Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {

    const itemCardapioId = req.params.id;

    const itemCardapio = await prisma.itemCardapio.findMany({
      where: {
          id: itemCardapioId,
      },
      select: {
        id: true,
        name: true,
        price: true, 
        categoria: true,
        disponivel: true,
        Image: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(200).json(itemCardapio);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getItemByAvailable = async (req: Request, res: Response) => {
  try {

    const disponivel = req.params.disponivel;

    const itemCardapio = await prisma.itemCardapio.findMany({
      where: {
        disponivel: {
          contains: disponivel,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true,
        price: true, 
        categoria: true,
        disponivel: true,
        Image: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(200).json(itemCardapio);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getItemByCategoria = async (req: Request, res: Response) => {
  try {

    const categoria = req.params.categoria;

    const itemCardapio = await prisma.itemCardapio.findMany({
      where: {
        categoria: {
          contains: categoria,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true,
        price: true, 
        categoria: true,
        disponivel: true,
        Image: true,
        created_at: true,
        updated_at: true
      }
    });

    return res.status(200).json(itemCardapio);
  } catch (error) {
    return res.status(400).json(error);
  }
};