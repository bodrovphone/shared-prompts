'use client';

import { useState, useEffect } from 'react';
import { PromptCard } from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt.id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export const Feed = () => {
  const [search, setSearch] = useState('');
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch('/api/prompts');
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompts"
          className="search_input peer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
      </form>

      <PromptCardList data={prompts} handleTagClick={console.log} />
    </section>
  );
};
