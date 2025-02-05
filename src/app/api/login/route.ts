import jwt from 'jsonwebtoken';

export async function POST() {
  return Response.json(
    {
      accessToken: jwt.sign({ foo: 'bar' }, 'secret', { expiresIn: '1d' }),
      refreshToken: jwt.sign({ foo: 'bar' }, 'secret', { expiresIn: '7d' }),
    },
    {
      status: 200,
    },
  );
}
