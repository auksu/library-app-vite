// ./src/App.jsx

import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthProvider.jsx";
import LoginView from "./components/LoginView.jsx";
import BookListView from "./components/BookListView.jsx";
import { initializeLocalStorage } from "./data/initData.js";

// 画面切り替え用の内部コンポーネント
function MainView() {
  const { role } = useAuth();

  if (!role) return <LoginView />;

  return <BookListView />;
}

export default function App() {
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <AuthProvider>
      <MainView />
    </AuthProvider>
  );
}
