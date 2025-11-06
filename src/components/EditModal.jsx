// ./src/components/EditModal.jsx

import React, { useState, useEffect } from "react";

export default function EditModal({ isOpen, book, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setTags(book.tags || []);
    } else {
      setTitle("");
      setTags([]);
    }
    setTagInput("");
  }, [book]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleSave = () => {
    onSave({ ...book, title, tags });
    onClose();
  };

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="modal-content bg-white p-4 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-2">{book?.id ? "本を編集" : "本を追加"}</h2>
        <div className="mb-2">
          <label className="block text-sm">タイトル</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">タグ</label>
          <div className="flex gap-2 mb-1">
            <input
              type="text"
              className="flex-1 border rounded px-2 py-1"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Enter で追加"
            />
            <button className="px-2 py-1 border rounded" onClick={handleAddTag}>追加</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ×
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button className="px-3 py-1 border rounded" onClick={onClose}>キャンセル</button>
          <button className="px-3 py-1 bg-blue-100 rounded border" onClick={handleSave}>保存</button>
        </div>
      </div>
    </div>
  );
}
