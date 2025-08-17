import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import axios from "axios";

interface GoogleLoginInput {
  credential: string; // aqui será o access_token
}

export default async function LoginGoogleService({
  credential,
}: GoogleLoginInput) {
  try {
    // Pega os dados do usuário usando access_token
    const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${credential}`,
      },
    });

    const { email, name } = googleResponse.data;

    if (!email) throw new Error("Token Google inválido");

    // Verifica se usuário existe no banco
    let user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          name: name || "Usuário Google",
          email,
          password: "#", // campo opcional
        },
      });
    }

    // Gera token JWT do seu app
    const token = sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { subject: user.id, expiresIn: "30d" }
    );

    return { token, id: user.id, name: user.name, email: user.email };
  } catch (err: any) {
    console.error("Erro no LoginGoogleService:", err.response?.data || err.message);
    throw new Error("Falha ao validar token do Google");
  }
}
