import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserUpdateRequest {
  userId: string;
  newPassword: string;
}

export default async function ChangePasswordService({
  userId,
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
