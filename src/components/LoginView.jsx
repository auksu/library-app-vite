// /Users/uchidaasahi/Documents/library_app_vite/src/components/LoginView.jsx

import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useAuthController } from "../hooks/useAuthController.js";

export default function LoginView() {
  const { login } = useAuth();
  const { login: authLogin } = useAuthController();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = authLogin(username, password);
    if (user) {
      login(user);
    } else {
      setError("ユーザー名またはパスワードが間違っています♡");
    }
  };

  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">図書管理ログイン♡</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border px-2 py-1"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border px-2 py-1"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="px-3 py-1 border rounded bg-blue-100 mt-2">ログイン♡</button>
      </form>
    </div>
  );
}
