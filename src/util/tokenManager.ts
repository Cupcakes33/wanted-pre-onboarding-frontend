export const tokenManager = {
  getToken: (): string | null => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : null;
  },

  setToken: (token: string): void => {
    localStorage.setItem("token", token);
  },

  removeToken: (): void => {
    localStorage.removeItem("token");
  },
};
