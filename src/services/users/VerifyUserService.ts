import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
}

export default async function VerifyUser({ name, email }: UserRequest) {
  
  const user = await prismaClient.user.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive", // ignora maiúscula/minúscula
      },
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
}
