import prismaClient from "../../prisma";

interface UserUpdateRequest {
  userId: string;
  newName: string;
}

export default async function UpdatedNameService({
  userId,
  newName,
}: UserUpdateRequest) {
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user.name === newName) {
    throw new Error("O nome informado é o mesmo do usuário");
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      name: newName,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return updatedUser;
}
