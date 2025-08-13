export interface User {
  birth_date: string;
  created_at: string;
  email: string;
  id: string;
  is_active: boolean;
  name: string;
  password: string;
  phone: string;
  profile_image: string;
  type: 'USER' | 'ADMIN';
  updated_at: string;
  verified: boolean;

  cpf: string;
}
