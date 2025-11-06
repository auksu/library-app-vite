// ./src/components/FilterBar.jsx

import React, { useState } from "react";

export default function FilterBar({ query, onSearch, filterTags, onFilterTags, availableTags }) {
  const [input, setInput] = useState(query);

  const toggleTag = (tag) => {
    if (filterTags.includes(tag)) {
      onFilterTags(filterTags.filter(t => t !== tag));
    } else {
      onFilterTags([...filterTags, tag]);
    }
  };

  const handleSearch = () => onSearch(input);

  return (
    <div className="filter-bar mb-4">
      <input
        type="text"
        placeholder="タイトルまたはタグで検索"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border px-2 py-1 mr-2"
      />
      <button className="px-2 py-1 border rounded" onClick={handleSearch}>検索</button>
      <div className="tags mt-2 flex gap-1 flex-wrap">
        {availableTags.map(tag => (
          <span
            key={tag}
            className={`px-2 py-1 rounded cursor-pointer ${filterTags.includes(tag) ? "bg-blue-200" : "bg-gray-200"}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
