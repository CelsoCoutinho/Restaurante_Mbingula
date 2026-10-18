import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createEstoque = async (req: Request, res: Response) => {
  try {
    const { quantidade, unidade, produtoId } = req.body;

    const isProdutoId = await prisma.produto.findUnique({
      where: {
        id: produtoId,
      },
    });

    if (!isProdutoId) {
      return res.status(400).json({ message: "Este produto não existe!" });
    }

    const isEstoqueProdutoId = await prisma.estoque.findFirst({
      where: {
        produtoId: produtoId,
      },
    });

    if (isEstoqueProdutoId) {
      return res.status(400).json({
        message: "Este produto já tem um estoque, então só precisa atualizar.",
      });
    }

    const estoque = await prisma.estoque.create({
      data: {
        quantidade,
        unidade,
        Produto: {
          connect: { id: produtoId },
        },
      },
      select: {
        id: true,
        quantidade: true,
        unidade: true,
        Produto: {
          select: {
            id: true,
            nome: true,
            descricao: true,
          },
        },
      },
    });

    return res.status(200).json(estoque);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteEstoque = async (req: Request, res: Response) => {
  try {
    const estoqueId = req.params.id;

    await prisma.estoque.delete({
      where: {
        id: estoqueId,
      },
    });

    return res.json({ message: "Estoque deletado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllEstoques = async (req: Request, res: Response) => {
  try {
    const estoques = await prisma.estoque.findMany({
      select: {
        id: true,
        quantidade: true,
        unidade: true,
        Produto: {
          select: {
            id: true,
            nome: true,
            descricao: true,
          },
        },
      },
    });

    return res.json(estoques);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getEstoque = async (req: Request, res: Response) => {
  try {
    const estoqueId = req.params.id;

    const estoque = await prisma.estoque.findUnique({
      where: {
        id: estoqueId,
      },
      select: {
        id: true,
        quantidade: true,
        unidade: true,
        Produto: {
          select: {
            id: true,
            nome: true,
            descricao: true,
          },
        },
      },
    });

    if (!estoque) {
      return res.status(204);
    }

    return res.status(200).json(estoque);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getEstoqueByProdutoName = async (req: Request, res: Response) => {
  try {
    const produtoNome = req.params.nome;

    const estoque = await prisma.estoque.findMany({
      where: {
        Produto: {
          nome: {
            contains: produtoNome,
            mode: 'insensitive'
          },
        },
      },
      select: {
        id: true,
        quantidade: true,
        unidade: true,
        Produto: {
          select: {
            id: true,
            nome: true,
            descricao: true,
          },
        },
      },
    });

    if (!estoque) {
      return res.status(204);
    }

    return res.status(200).json(estoque);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateEstoque = async (req: Request, res: Response) => {
  try {
    const estoqueId = req.params.id;
    const { quantidade, unidade, produtoId } = req.body;

    await prisma.estoque.update({
      where: {
        id: estoqueId,
      },
      data: {
        quantidade,
        unidade,
        produtoId: produtoId,
      },
    });

    return res.json({ message: "Estoque deste produto atualizado!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
