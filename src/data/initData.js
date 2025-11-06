// ./src/data/initData.js

import initialBooks from "./initialBooks.js";

export function initializeLocalStorage() {
  if (!localStorage.getItem("booksData")) {
    const booksWithId = initialBooks.map((b) => ({ ...b, id: Date.now().toString() + Math.random() }));
    localStorage.setItem("booksData", JSON.stringify(booksWithId));
  }

  const authData = {
    main: { username: "admin", password: "cacadmin", role: "admin" },
    user1: { username: "cac", password: "ksucac2025", role: "user" },
  };

  if (!localStorage.getItem("authData")) {
    localStorage.setItem("authData", JSON.stringify(authData));
  }
}
