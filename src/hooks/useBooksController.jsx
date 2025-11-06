// ./src/hooks/useBooksController.jsx

import { useState, useMemo } from "react";

// 初期データ
const initialBooksData = [
  { title: "JavaScript入門", tags: ["プログラミング", "JS"], studentId: "", id: "1" },
  { title: "React完全ガイド", tags: ["プログラミング", "React"], studentId: "", id: "2" },
  { title: "デザインパターン入門", tags: ["設計", "OOP"], studentId: "", id: "3" },
];

export function useBooksController() {
  const [books, setBooks] = useState(initialBooksData);
  const [query, setQuery] = useState("");
  const [filterTags, setFilterTags] = useState([]);

  const saveBook = (book) => {
    setBooks((prev) => {
      const idx = prev.findIndex((b) => b.id === book.id);
      if (idx >= 0) {
        const newBooks = [...prev];
        newBooks[idx] = book; // 更新
        return newBooks;
      } else {
        // 新規追加の場合はランダムIDを付与
        return [...prev, { ...book, id: Date.now().toString() }];
      }
    });
  };

  const deleteBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  const search = (text) => setQuery(text);
  const filterByTags = (tags) => setFilterTags(tags);

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchQuery = b.title.includes(query);
      const matchTags = filterTags.length === 0 || filterTags.every((tag) => b.tags.includes(tag));
      return matchQuery && matchTags;
    });
  }, [books, query, filterTags]);

  return {
    books: filteredBooks,
    query,
    filterTags,
    search,
    filterByTags,
    saveBook,
    deleteBook,
  };
}
