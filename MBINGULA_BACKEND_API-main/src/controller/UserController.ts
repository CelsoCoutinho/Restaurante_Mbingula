import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, accessName } = req.body;

    const isUserEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserEmail) {
      return res
        .status(400)
        .json({ message: "Já existe um usuário com este email" });
    }

    const isAccessName = await prisma.access.findUnique({
      where: {
        name: accessName,
      },
    });

    if (!isAccessName) {
      return res
        .status(400)
        .json({ message: "Este nivel de acesso não existe" });
    }

    const isUserPhone = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (isUserPhone) {
      return res
        .status(400)
        .json({ message: "Este número de telefone já existe" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
        userAccess: {
          create: {
            Access: {
              connect: {
                name: accessName,
              },
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
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

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteManyUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.deleteMany();

    return res.json({ message: "Usuários deletados" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return res.json({ message: "Usuário deletado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateUserIsLogged = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { name, email, phone, password } = req.body;

    await prisma.user.update({
      where: {
        id,
      },
      data: { name, email, phone, password },
    });

    return res.json({ message: "Usuário Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, email, phone, password, accessName } = req.body;

    const isAccessName = await prisma.access.findUnique({
      where: {
        name: accessName,
      },
    });

    if (!isAccessName) {
      return res
        .status(400)
        .json({ message: "Este nivel de acesso não existe" });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        phone,
        password,
        userAccess: {
          deleteMany: {},
          create: {
            Access: {
              connect: {
                name: accessName,
              },
            },
          },
        },
      },
    });

    return res.json({ message: "Usuário Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateUserAccess = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { accessName } = req.body;

    const isAccessName = await prisma.access.findUnique({
      where: {
        name: accessName,
      },
    });

    if (!isAccessName) {
      return res
        .status(400)
        .json({ message: "Este nivel de acesso não existe" });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userAccess: {
          deleteMany: {},
          create: {
            Access: {
              connect: {
                name: accessName,
              },
            },
          },
        },
      },
    });

    return res.json({ message: "Usuário Atualizado" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    return res.json(users);

    if (!users) {
      return res.status(204);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getUserIsLogged = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
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
      return res.status(204);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
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
      return res.status(204);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getUserByName = async (req: Request, res: Response) => {
  try {
    const userName = req.params.name;

    const user = await prisma.user.findMany({
      where: {
        name: {
          contains: userName,
          mode: 'insensitive'
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
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
      return res.status(204);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};