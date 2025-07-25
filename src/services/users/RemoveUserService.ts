import prismaClient from "../../prisma";

export default async function RemoveUserService(userId: string) {
  const userRemove = await prismaClient.user.delete({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return userRemove;
}
