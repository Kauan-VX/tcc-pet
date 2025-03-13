import jwt from 'jsonwebtoken';
import { authValidator } from '../auth-validator-mock';

export async function POST(request: Request) {
  const { token } = await request.json();

  const auth = authValidator(token);

  if (!auth) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
