import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createFornecedor = async (req: Request, res: Response) => {
  try {
    const { nome, telefone, email, descricao } = req.body;

    const isTelefone = await prisma.fornecedor.findUnique({
      where: {
        telefone,
      },
    });

    if (isTelefone) {
      return res.status(400).json({
        message:
          "Este número de telefone já existe e pertence a outro fornecedor.",
      });
    }

    const isEmail = await prisma.fornecedor.findUnique({
      where: {
        email,
      },
    });

    if (isEmail) {
      return res.status(400).json({
        message: "Este email já existe e pertence a outro fornecedor.",
      });
    }

    const fornecedor = await prisma.fornecedor.create({
      data: { nome, telefone, email, descricao },
    });

    return res.json(fornecedor);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getFornecedor = async (req: Request, res: Response) => {
  try {
    const fornecedorId = req.params.id;

    const fornecedor = await prisma.fornecedor.findUnique({
      where: {
        id: fornecedorId,
      },
    });

    if (!fornecedor) {
      return res.status(204);
    }

    return res.status(200).json(fornecedor);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllFornecedor = async (req: Request, res: Response) => {
  try {
    const fornecedores = await prisma.fornecedor.findMany();
    return res.json(fornecedores);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getFornecedorByName = async (req: Request, res: Response) => {
  try {
    const fornecedorNome = req.params.nome;

    const fornecedor = await prisma.fornecedor.findMany({
      where: {
        nome: {
          contains: fornecedorNome,
          mode: 'insensitive'
        },
      },
    });

    if (!fornecedor) {
      return res.status(204);
    }

    return res.status(200).json(fornecedor);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getFornecedorByTelefone = async (req: Request, res: Response) => {
  try {
    const fornecedorTelefone = req.params.telefone;

    const fornecedor = await prisma.fornecedor.findMany({
      where: {
        telefone: {
          contains: fornecedorTelefone,
        },
      },
    });

    if (!fornecedor) {
      return res.status(204);
    }

    return res.status(200).json(fornecedor);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteFornecedor = async (req: Request, res: Response) => {
  try {
    const fornecedorId = req.params.id;

    await prisma.fornecedor.delete({
      where: {
        id: fornecedorId,
      },
    });

    return res.json({ message: "Fornecedor deletado!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateFornecedor = async (req: Request, res: Response) => {
  try {
    const fornecedorId = req.params.id;
    const { nome, telefone, email, descricao } = req.body;

    await prisma.fornecedor.update({
      where: {
        id: fornecedorId,
      },
      data: { nome, telefone, email, descricao },
    });

    return res.json({ message: "fornecedor Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
