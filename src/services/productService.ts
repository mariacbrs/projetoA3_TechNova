export type Product = {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly booking: string;
};

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
       
      ]);
    }, 1000); 
  });
}
