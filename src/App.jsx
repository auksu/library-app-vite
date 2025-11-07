// ./src/App.jsx

import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthProvider.jsx";
import LoginView from "./components/LoginView.jsx";
import BookListView from "./components/BookListView.jsx";
import { initializeLocalStorage } from "./data/initData.js"; // ← そのまま

function MainView() {
  const { role } = useAuth();
  if (!role) return <LoginView />;
  return <BookListView userRole={role} />;
}

export default function App() {
  useEffect(() => {
    initializeLocalStorage(); // ← これで localStorage 初期化
  }, []);

  return (
    <AuthProvider>
      <MainView />
    </AuthProvider>
  );
}
