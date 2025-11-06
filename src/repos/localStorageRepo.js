// ./src/repos/localStorageRepo.js

export const loadBooks = () => {
  const data = localStorage.getItem("booksData");
  return data ? JSON.parse(data) : [];
};

export const saveBooks = (books) => {
  localStorage.setItem("booksData", JSON.stringify(books));
};
