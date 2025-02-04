import jwt from 'jsonwebtoken';

export async function POST() {
  return Response.json(
    {
      data: {
        Vinculo: 'USUARIOSGU',
        Nome: 'CAIO SIQUEIRA DA SILVA',
        IdUsuario: 2710,
        IdCC: 73,
        IdCliente: 417010,
        UsernameSGU: 'LEOFOTOS',
        Cpf: '11624332722',
        Tokens: {
          AccessToken: jwt.sign({ foo: 'bar' }, 'secret', { expiresIn: '1d' }),
          RefreshToken: jwt.sign({ foo: 'bar' }, 'secret', { expiresIn: '7d' }),
        },
        FauxGuidIdUsuario: '41434bdb-0e89-000d-b837-3433f5767772',
        FauxGuidIdCC: '41434104-0456-000d-673d-34332a7c7772',
        FauxGuidIdCliente: '41451dbf-58ed-000b-dc61-323391207172',
        Email: 'rpkgzzfod@emlpro.com',
      },
      cod: 0,
    },
    {
      status: 200,
    },
  );
}
