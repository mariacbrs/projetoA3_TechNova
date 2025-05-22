// services/authService.ts
export function fakeLogin(email: string, senha: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@exemplo.com" && senha === "123456") {
        resolve(true);
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 1000);
  });
}
