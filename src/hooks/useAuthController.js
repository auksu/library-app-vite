// ./src/hooks/useAuthController.js

export function useAuthController() {
  const login = (username, password) => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData) return null;

    const accounts = Object.values(authData);
    const found = accounts.find(acc => acc.username === username && acc.password === password);
    if (!found) return null;

    return { username: found.username, role: found.role };
  };

  return { login };
}
