import prismaClient from "../../prisma";
import { hash, compare } from "bcryptjs";

interface UserUpdateRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export default async function UpdatedPasswordUserService({
  userId,
  oldPassword,
  newPassword,
}: UserUpdateRequest) {
  // acessando o usuário pelo ID
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // verificando se a senha antiga está correta
  const passwordMatch = await compare(oldPassword, user.password);

  if (!passwordMatch) {
    throw new Error("Senha antiga incorreta");
  }

  // atualizando para a nova senha
  const hashedPassword = await hash(newPassword, 8);

  const updateUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return updateUser;
}
