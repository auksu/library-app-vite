// ./src/components/BookListView.jsx

import React, { useState, useMemo } from "react";
import BookItem from "./BookItem.jsx";
import EditModal from "./EditModal.jsx";
import { useBooksController } from "../hooks/useBooksController.jsx";

export default function BookListView({ userRole = "user" }) {
  const {
    books,
    query,
    filterTags,
    search,
    filterByTags,
    saveBook,
    deleteBook
  } = useBooksController();

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setSelectedBook({ title: "", tags: [] });
    setIsModalOpen(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleSave = (book) => {
    saveBook(book);
  };

  const handleAddFilterTag = (tag) => {
    if (tag && !filterTags.includes(tag)) {
      filterByTags([...filterTags, tag]);
    }
  };

  const handleRemoveFilterTag = (tag) => {
    filterByTags(filterTags.filter((t) => t !== tag));
  };

  // 本のタグをすべて集めてボタン化
  const allTags = useMemo(() => Array.from(new Set(books.flatMap((b) => b.tags))), [books]);

  // 検索＋タグ絞り込みを反映した表示用配列
  const filteredBooks = books.filter((book) => {
    const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase());
    const matchesTags = filterTags.every((tag) => book.tags.includes(tag));
    return matchesQuery && matchesTags;
  });

  return (
    <div className="p-4">
      {/* 検索バー + 本追加ボタン */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="検索"
          value={query}
          onChange={(e) => search(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        {userRole === "admin" && (
          <button
            className="px-3 py-1 bg-green-100 rounded border"
            onClick={handleAdd}
          >
            本を追加
          </button>
        )}
      </div>

      {/* タグボタン */}
      <div className="mb-4">
        <label className="block mb-1 text-sm">タグで絞り込み</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {allTags.map((tag) => {
            const isSelected = filterTags.includes(tag);
            return (
              <button
                key={tag}
                className={`px-2 py-1 rounded border ${
                  isSelected ? "bg-blue-400 text-white" : "bg-gray-100"
                }`}
                onClick={() => {
                  if (isSelected) handleRemoveFilterTag(tag);
                  else handleAddFilterTag(tag);
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* 選択中タグ表示 */}
        <div className="flex flex-wrap gap-2">
          {filterTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-200 rounded cursor-pointer"
              onClick={() => handleRemoveFilterTag(tag)}
            >
              {tag} ×
            </span>
          ))}
        </div>
      </div>

      {/* 本リスト */}
      <div className="grid gap-2">
        {filteredBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onToggleLoan={(updatedBook) => saveBook(updatedBook)}
            onEdit={userRole === "admin" ? () => handleEdit(book) : undefined}
            onDelete={userRole === "admin" ? () => deleteBook(book.id) : undefined}
          />
        ))}
        {filteredBooks.length === 0 && (
          <p className="text-gray-400">該当する本はありません</p>
        )}
      </div>

      {/* 編集／追加モーダル */}
      {userRole === "admin" && (
        <EditModal
          isOpen={isModalOpen}
          book={selectedBook}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
