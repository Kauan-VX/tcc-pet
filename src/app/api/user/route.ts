import { authValidator } from '../auth-validator-mock';
import { users } from './data';

export async function POST(request: Request) {
  const auth = authValidator(request.headers.get('Authorization') || '');

  if (!auth) {
    return Response.json({ error: 'Unauthorized' }, { status: 400 });
  }

  const { user } = await request.json();

  const lastId = users[users.length - 1].id;

  users.push({ id: lastId + 1, ...user });

  return Response.json(
    {
      message: 'Usuário adicionado com sucesso',
    },
    {
      status: 200,
    },
  );
}

export async function GET(request: Request) {
  const auth = authValidator(request.headers.get('Authorization') || '');

  if (!auth) {
    return Response.json({ error: 'Unauthorized' }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get('page') || 0);
  const limit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('keyword')?.toLowerCase();
  const orderBy = searchParams.get('orderBy'); // Nome da coluna para ordenar
  const orderType = searchParams.get('orderType') || 'asc'; // Direção da ordenação ('asc' ou 'desc')

  const startIndex = page * limit;
  const endIndex = startIndex + limit;

  // Filtrando os usuários com base no keyword
  const filteredUsers = keyword
    ? users.filter((user) => {
        return (
          user.email.toLowerCase().includes(keyword) ||
          user.username.toLowerCase().includes(keyword) ||
          user.gender.toLowerCase().includes(keyword) ||
          String(user.age).includes(keyword)
        );
      })
    : users;

  // Ordenando os usuários com base na coluna e direção fornecida
  if (
    orderBy &&
    ['id', 'email', 'username', 'gender', 'age'].includes(orderBy)
  ) {
    filteredUsers.sort((a, b) => {
      let compare = 0;

      if (a[orderBy] < b[orderBy]) {
        compare = -1;
      } else if (a[orderBy] > b[orderBy]) {
        compare = 1;
      }

      return orderType === 'desc' ? -compare : compare;
    });
  }

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return Response.json(
    {
      total: filteredUsers.length,
      page,
      limit,
      data: paginatedUsers,
    },
    {
      status: 200,
    },
  );
}
