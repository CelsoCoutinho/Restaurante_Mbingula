import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createPedidoLocal = async (req: Request, res: Response) => {
    try {
      const {
        tipoConsumo,
        valorTotal,
        itemsPedido,
        metodoPagamento,
        numeroMesa,
        userName,
        userPhone
      } = req.body;

      const numero = numeroMesa;

      const isNumeroMesa = await prisma.mesa.findUnique({
        where: {
          numero,
        },
      });
  
      if (!isNumeroMesa) {
        return res.status(400).json({
          message: "Não existe uma mesa com este número!",
        });
      }
  
      const pedidoLocal = await prisma.pedidoLocal.create({
        data: {
          tipoConsumo,
          valorTotal,
          itemsPedido,
          metodoPagamento,
          status: 'em preparação',
          numeroMesa,
          userName,
          userPhone,
        },
      });
  
      return res.status(200).json(pedidoLocal);
    } catch (error) {
      return res.status(400).json(error);
    }
};

export const getAllPedidoLocal = async (req: Request, res: Response) => {
  try {
    const pedidoLocal = await prisma.pedidoLocal.findMany();

    return res.json(pedidoLocal);

    if (!pedidoLocal) {
      return res.status(204);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updatePedidoLocal = async (req: Request, res: Response) => {
  try {
    const pedidoLocalId = req.params.id;
    const {
      tipoConsumo,
      valorTotal,
      itemsPedido,
      metodoPagamento,
      status,
      numeroMesa,
      userName,
      userPhone
    } = req.body;

    await prisma.pedidoLocal.update({
      where: {
        id: pedidoLocalId,
      },
      data: {
        tipoConsumo,
        valorTotal,
        itemsPedido,
        metodoPagamento,
        status,
        numeroMesa,
        userName,
        userPhone,
      },
    });

    return res.json({ message: "Pedido Atualizado com sucesso!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateStatusPedidoLocal = async (req: Request, res: Response) => {
  try {
    const pedidoLocalId = req.params.id;
    const { status } = req.body;

    await prisma.pedidoLocal.update({
      where: {
        id: pedidoLocalId,
      },
      data: {
        status
      },
    });

    return res.json({ message: "Status do pedido atualizado com sucesso!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deletePedidoLocal = async (req: Request, res: Response) => {
  try {
    const pedidoLocalId = req.params.id;

    await prisma.pedidoLocal.delete({
      where: {
        id: pedidoLocalId,
      },
    });

    return res.json({ message: "Pedido removido com sucesso!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPedidoLocalByUserName = async (req: Request, res: Response) => {
  try {
    const userName = req.params.userName;

    const pedidoLocal = await prisma.pedidoLocal.findMany({
      where: {
        userName: {
          equals: userName,
          mode: 'insensitive',
        },
      },
    });

    if (!pedidoLocal) {
      return res.status(204);
    }

    return res.status(200).json(pedidoLocal);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPedidoLocalById = async (req: Request, res: Response) => {
  try {
    const pedidoLocalId = req.params.id;

    const pedidoLocal = await prisma.pedidoLocal.findMany({
      where: {
        id: pedidoLocalId
      },
    });

    if (!pedidoLocal) {
      return res.status(204);
    }

    return res.status(200).json(pedidoLocal);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPedidoLocalByUserPhone = async (req: Request, res: Response) => {
  try {
    const userPhone = req.params.userPhone;

    const pedidoLocal = await prisma.pedidoLocal.findMany({
      where: {
        userName: {
          contains: userPhone,
        },
      },
    });

    if (!pedidoLocal) {
      return res.status(204);
    }

    return res.status(200).json(pedidoLocal);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteAllPedidosByStatus = async (req: Request, res: Response) => {
  try {
    const userStatus = req.params.status;

    const pedidoLocalStatus = await prisma.pedidoLocal.deleteMany({
      where: {
        status: {
          contains: userStatus,
        },
      },
    });  

    if (!pedidoLocalStatus) {
      return res.status(204);
    }

    return res.status(200).json(pedidoLocalStatus);
  } catch (error) {
    return res.status(400).json(error);
  }
};