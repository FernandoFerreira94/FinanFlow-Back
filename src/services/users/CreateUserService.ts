import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export default async function CreateUserService({
  name,
  email,
  password,
}: UserRequest) {
  const userExist = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    throw new Error("Email já cadastrado");
  }

  const passwordHash = await hash(password, 8);

  const regex = /^[A-Za-zÀ-ÿ\s]+$/;

  if (!regex.test(name)) {
    throw new Error("Nome inválido, apenas letras são permitidas.");
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }
}
