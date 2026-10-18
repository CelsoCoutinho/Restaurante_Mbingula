import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createReservaMesa = async (req: Request, res: Response) => {
    try {
      const numeroMesa = req.params.numero;
      const { statusOcupacao, qtd_pessoa, nome_cliente, tel_cliente, dataReserva } = req.body;
  
      await prisma.mesa.update({
        where: {
          numero: parseInt(numeroMesa),
        },
        data: {
           statusOcupacao,
           qtd_pessoa,
           nome_cliente, 
           tel_cliente, 
           dataReserva
        },
      });
  
      return res.json({ message: "Mesa reservada com sucesso!" });
    } catch (error) {
      return res.status(400).json(error);
    }
};

export const getAllMesasDisponiveis = async (req: Request, res: Response) => {
    try {
      const mesasDisponiveis = await prisma.mesa.findMany({
        where: {
            statusOcupacao: "Disponível",
        },
        select: {
            numero: true,
            lugares: true,
            posicao: true,
            statusOcupacao: true
        }        
      });
      return res.json(mesasDisponiveis);
    } catch (error) {
      return res.status(400).json(error);
    }
};

export const getAllMesasJaReservadas = async (req: Request, res: Response) => {
    try {
      const mesasReservadas = await prisma.mesa.findMany({
        where: {
            statusOcupacao: "Reservada",
        },
        select: {
            numero: true,
            lugares: true,
            posicao: true,
            statusOcupacao: true,
            qtd_pessoa: true,
            nome_cliente: true, 
            tel_cliente: true, 
            dataReserva: true,
        }        
      });
      return res.json(mesasReservadas);
    } catch (error) {
      return res.status(400).json(error);
    }
};

export const makeMesaAvailable = async (req: Request, res: Response) => {
  try {
    const mesaId = req.params.id;

    await prisma.mesa.update({
      where: {
        id: mesaId,
      },
      data: {
         statusOcupacao: "Disponível",
      },
    });

    return res.json({ message: "Mesa disponibilizada com sucesso!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};