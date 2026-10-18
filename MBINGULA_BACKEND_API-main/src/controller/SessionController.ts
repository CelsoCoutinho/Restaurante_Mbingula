import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { prisma } from "../database/prisma";
import logger from '../../utils/logger';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
      include: {
        userAccess: {
          select: {
            Access: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Este usuário não existe, verifique se o número de telefone está correcto!" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

    if (!MY_SECRET_KEY) {
      throw new Error("Chave secreta não fornecida");
    }

    const token = sign(
      {
        userId: user.id,
        roles: user.userAccess.map((role) => role.Access?.name),
      },
      MY_SECRET_KEY,
      {
        algorithm: "HS256",
        // expiresIn: "15m",
      }
    );

  logger.info({
    level: 'info',
    message: "O utilizador logou!",
    nome_utilizador: `${user.name}`,
    numero_telefone: `${user.phone}`
  })

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
