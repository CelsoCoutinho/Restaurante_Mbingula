import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createFuncionario = async (req: Request, res: Response) => {
  try {
    const {
      name,
      morada,
      bilheteidentidade,
      telefone,
      cargo,
      salario,
      sectorId,
    } = req.body;

    const isBilheteIdentidade = await prisma.funcionario.findUnique({
      where: {
        bilheteidentidade,
      },
    });

    if (isBilheteIdentidade) {
      return res.status(400).json({
        message: "Este bilhete identidade pertence a outro funcionário",
      });
    }

    const isTelefone = await prisma.funcionario.findUnique({
      where: {
        telefone,
      },
    });

    if (isTelefone) {
      return res.status(400).json({
        message: "Este número de telefone pertence a outro funcionário",
      });
    }

    const funcionario = await prisma.funcionario.create({
      data: {
        name,
        morada,
        bilheteidentidade,
        telefone,
        cargo,
        salario,
        Sector: {
          connect: { id: sectorId },
        },
      },
      select: {
        id: true,
        name: true,
        morada: true,
        bilheteidentidade: true,
        telefone: true,
        cargo: true,
        salario: true,
        Sector: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json(funcionario);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteFuncionario = async (req: Request, res: Response) => {
  try {
    const funcionarioId = req.params.id;

    await prisma.funcionario.delete({
      where: {
        id: funcionarioId,
      },
    });

    return res.json({ message: "Funcionario deletado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteManyFuncionario = async (req: Request, res: Response) => {
  try {
    await prisma.funcionario.deleteMany();

    return res.json({ message: "Funcionarios deletados" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionarios = await prisma.funcionario.findMany();

    return res.json(funcionarios);

    if (!funcionarios) {
      return res.status(204);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getFuncionario = async (req: Request, res: Response) => {
  try {
    const funcionarioId = req.params.id;

    const funcionario = await prisma.funcionario.findUnique({
      where: {
        id: funcionarioId,
      },
      select: {
        id: true,
        name: true,
        morada: true,
        bilheteidentidade: true,
        telefone: true,
        cargo: true,
        salario: true,
        Sector: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!funcionario) {
      return res.status(204);
    }

    return res.status(200).json(funcionario);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getFuncionarioByName = async (req: Request, res: Response) => {
  try {
    const funcionarioName = req.params.name;

    const funcionario = await prisma.funcionario.findMany({
      where: {
        name: {
          contains: funcionarioName,
          mode: 'insensitive'
        },
      },
      select: {
        id: true,
        name: true,
        morada: true,
        bilheteidentidade: true,
        telefone: true,
        cargo: true,
        salario: true,
        Sector: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!funcionario) {
      return res.status(204);
    }

    return res.status(200).json(funcionario);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getFuncionarioByPhone = async (req: Request, res: Response) => {
  try {
    const funcionarioPhone = req.params.telefone;

    const funcionario = await prisma.funcionario.findUnique({
      where: {
        telefone: funcionarioPhone,
      },
      select: {
        id: true,
        name: true,
        morada: true,
        bilheteidentidade: true,
        telefone: true,
        cargo: true,
        salario: true,
        Sector: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!funcionario) {
      return res.status(204);
    }

    return res.status(200).json(funcionario);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getFuncionarioByBI = async (req: Request, res: Response) => {
  try {
    const funcionarioBI = req.params.bilheteidentidade;

    const funcionario = await prisma.funcionario.findUnique({
      where: {
        bilheteidentidade: funcionarioBI,
      },
      select: {
        id: true,
        name: true,
        morada: true,
        bilheteidentidade: true,
        telefone: true,
        cargo: true,
        salario: true,
        Sector: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!funcionario) {
      return res.status(204);
    }

    return res.status(200).json(funcionario);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateFuncionario = async (req: Request, res: Response) => {
  try {
    const funcionarioId = req.params.id;
    const {
      name,
      morada,
      bilheteidentidade,
      telefone,
      cargo,
      salario,
      sectorId,
    } = req.body;

    const isSectorExist = await prisma.sector.findUnique({
      where: {
        id: sectorId,
      },
    });

    if (!isSectorExist) {
      return res.status(400).json({
        message: "Este sector não existe",
      });
    }

    await prisma.funcionario.update({
      where: {
        id: funcionarioId,
      },
      data: {
        name,
        morada,
        bilheteidentidade,
        telefone,
        cargo,
        salario,
        sectorId: sectorId,
      },
    });

    return res.json({ message: "Funcionario Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

