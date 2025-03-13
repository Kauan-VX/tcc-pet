export async function POST() {
  return Response.json(
    {
      message: 'E-mail de recuperação de senha enviado com sucesso!',
    },
    {
      status: 200,
    },
  );
}
