// ./src/hooks/useBooksController.jsx

import { useState, useEffect, useMemo } from "react";
import { db } from "../firebaseConfig.js";
import { ref, onValue, set, push } from "firebase/database";

export function useBooksController() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [filterTags, setFilterTags] = useState([]);

  useEffect(() => {
    const booksRef = ref(db, "books");
    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const booksArray = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setBooks(booksArray);
    });
    return () => unsubscribe();
  }, []);

  const saveBook = (book) => {
    const booksRef = ref(db, "books");
    if (book.id) {
      set(ref(db, `books/${book.id}`), {
        title: book.title,
        tags: book.tags,
        studentId: book.studentId || "",
      });
    } else {
      const newRef = push(booksRef);
      set(newRef, {
        title: book.title,
        tags: book.tags,
        studentId: book.studentId || "",
      });
    }
  };

  const deleteBook = (id) => {
    set(ref(db, `books/${id}`), null);
  };

  const search = (text) => setQuery(text);
  const filterByTags = (tags) => setFilterTags(tags);

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchQuery = b.title.toLowerCase().includes(query.toLowerCase());
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
