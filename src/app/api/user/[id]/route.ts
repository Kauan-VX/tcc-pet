import { authValidator } from '../../auth-validator-mock';
import { users } from '../data';

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: number } },
) {
  const auth = authValidator(request.headers.get('Authorization') || '');

  if (!auth) {
    return Response.json({ error: 'Unauthorized' }, { status: 400 });
  }

  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex === -1) {
    return Response.json(
      {
        error: 'Usuário não encontrado',
      },
      {
        status: 400,
      },
    );
  }

  users.splice(userIndex, 1);

  return Response.json(
    {
      message: 'Usuário deletado com sucesso',
    },
    {
      status: 200,
    },
  );
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: number } },
) {
  const auth = authValidator(request.headers.get('Authorization') || '');

  if (!auth) {
    return Response.json({ error: 'Unauthorized' }, { status: 400 });
  }
  const { user } = await request.json();

  console.log({ users });

  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex === -1) {
    return Response.json(
      {
        error: 'Usuário não encontrado',
      },
      {
        status: 400,
      },
    );
  }

  users[userIndex] = user;

  return Response.json(
    {
      message: 'Usuário atualizado com sucesso',
    },
    {
      status: 200,
    },
  );
}
