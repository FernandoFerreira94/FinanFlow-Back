import prismaClient from "../../prisma";

export default async function DetailUserService(userId: string) {
  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
}
