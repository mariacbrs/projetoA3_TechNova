import api from './api';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  tipo: number; // 0 = admin, 1 = cliente
}

export async function login(email: string, senha: string): Promise<Usuario> {
  const response = await api.post('/auth/login', { email, senha });
  return response.data as Usuario;
}

export async function register(data: {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}): Promise<{ id: number }> {
  const response = await api.post('/auth/register', data);
  return response.data as { id: number };
}