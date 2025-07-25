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
    throw new Error("Esse usuario já possue uma conta");
  }

  const passwordHash = await hash(password, 8);

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
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }
}
