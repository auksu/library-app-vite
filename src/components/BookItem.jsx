// ./src/components/BookItem.jsx

import React, { useState, useEffect } from "react";

export default function BookItem({ book, onToggleLoan, onEdit, onDelete }) {
  const [borrower, setBorrower] = useState(book.studentId || "");

  useEffect(() => {
    setBorrower(book.studentId || "");
  }, [book.studentId]);

  const handleToggle = () => {
    if (!borrower.trim() && !book.studentId) {
      alert("貸出者名を入力してください");
      return;
    }
    onToggleLoan({ ...book, studentId: book.studentId ? "" : borrower });
  };

  return (
    <div className="book-item border p-2 rounded flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <div className="font-semibold">{book.title}</div>
        <div className="flex gap-1 flex-wrap text-sm text-gray-600">
          {book.tags?.map((tag) => (
            <span key={tag} className="bg-gray-200 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>

        {book.studentId ? (
          <div className="text-red-500 text-xs mt-1">貸出中: {book.studentId}</div>
        ) : (
          <input
            type="text"
            placeholder="借りる人の名前"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
            className="border px-2 py-1 text-sm mt-1"
          />
        )}
      </div>

      <div className="flex gap-2">
        {onToggleLoan && (
          <button
            className={`px-2 py-1 border rounded ${book.studentId ? "bg-red-100" : "bg-green-100"}`}
            onClick={handleToggle}
          >
            {book.studentId ? "返却" : "貸出"}
          </button>
        )}
        {onEdit && (
          <button className="px-2 py-1 border rounded bg-blue-100" onClick={() => onEdit(book)}>
            編集
          </button>
        )}
        {onDelete && (
          <button className="px-2 py-1 border rounded bg-gray-100" onClick={() => onDelete(book.id)}>
            削除
          </button>
        )}
      </div>
    </div>
  );
}
