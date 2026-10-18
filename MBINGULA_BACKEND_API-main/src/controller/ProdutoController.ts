import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, fornecedorId } = req.body;

    const isFornecedorId = await prisma.fornecedor.findUnique({
      where: {
        id: fornecedorId
      },
    });

    if (!isFornecedorId) {
      return res
        .status(400)
        .json({ message: "Este fornecedor não existe!" });
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        Fornecedor: {
          connect: { id: fornecedorId },
        },
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        Fornecedor: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
      },
    });

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteProduto = async (req: Request, res: Response) => {
  try {
    const produtoId = req.params.id;

    await prisma.produto.delete({
      where: {
        id: produtoId,
      },
    });

    return res.json({ message: "Produto deletado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany();

    return res.json(produtos);

  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getProduto = async (req: Request, res: Response) => {
  try {
    const produtoId = req.params.id;

    const produto = await prisma.produto.findUnique({
      where: {
        id: produtoId,
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        Fornecedor: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
        created_at: true,
        updated_at: true
      },
    });

    if (!produto) {
      return res.status(204);
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getProdutoByName = async (req: Request, res: Response) => {
  try {
    const produtoNome = req.params.nome;

    const produto = await prisma.produto.findMany({
      where: {
        nome: {
          contains: produtoNome,
          mode: 'insensitive'
        },
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        Fornecedor: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
        created_at: true,
        updated_at: true
      },
    });

    if (!produto) {
      return res.status(204);
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateProduto = async (req: Request, res: Response) => {
  try {
    const produtoId = req.params.id;
    const { nome, descricao, fornecedorId } = req.body;

    await prisma.produto.update({
      where: {
        id: produtoId,
      },
      data: {
        nome,
        descricao,
        fornecedorId: fornecedorId,
      },
    });

    return res.json({ message: "Produto Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
