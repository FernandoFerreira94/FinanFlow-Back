import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

import jwt from "jsonwebtoken";

interface GoogleLoginInput {
  credential: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default async function LoginGoogleService({
  credential,
}: GoogleLoginInput) {
  const decoded: any = jwt.decode(credential);
  if (!decoded?.email) {
    throw new Error("Token Google inválido");
  }

  const email = decoded.email as string;
  const name = (decoded.name as string) || "Usuário Google";

  // Verifica se usuário existe no banco pelo email
  let user = await prismaClient.user.findUnique({
    where: { email },
  });

  // Se não existir, cria um novo usuário
  if (!user) {
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: "#", // ou algum campo opcional, pois login google não usa senha no seu backend
      },
    });
  }

  const token = sign(
    {
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      subject: user.id,
      expiresIn: "30d",
    }
  );

  return {
    token,
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
