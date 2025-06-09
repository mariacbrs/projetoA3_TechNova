import api from './api';

export type Product = {
  readonly id: number;
  readonly titulo: string;
  readonly descricao: string
};

export async function fetchProducts(): Promise<Product[]> {
  const response = await api.get('/procedimentos');
  return response.data;
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<void> {
  await api.post('/procedimentos', product);
}

export async function updateProduct(id: number, product: Omit<Product, 'id'>): Promise<void> {
  await api.put(`/procedimentos/${id}`, product);
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/procedimentos/${id}`);
}
