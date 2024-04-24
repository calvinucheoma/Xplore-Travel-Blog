'use client';

// import { blogData } from '@/constants/blogData';
import BlogCard from './BlogCard';
import { useState } from 'react';
import Button from '../ui/Button';
import { PostTypes } from '@/types/postTypes';
import clsx from 'clsx';

const Posts: React.FC<{ posts: PostTypes[] }> = ({ posts }) => {
  const [visibleBlogs, setVisibleBlogs] = useState(5);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
  };

  const filterPostsByCategory = () => {
    if (selectedCategory === 'all') {
      return posts;
    } else {
      return posts.filter((post) => post.category === selectedCategory);
    }
  };

  const categories = [
    'Adventure',
    'Wanderlust',
    'Culture',
    'Discovery',
    'Journey',
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleBlogs(5);
  };

  return (
    <section className="col-span-2" aria-labelledby="latest-post">
      <div className="w-full text-center">
        <h2
          id="latest-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px-2 mb-10"
        >
          Posts
        </h2>
      </div>

      <div className="flex justify-center space-x-4 flex-wrap">
        <button
          key="all"
          onClick={() => handleCategoryChange('all')}
          className={clsx(
            selectedCategory === 'all'
              ? 'bg-primary/60 text-white'
              : 'bg-primary text-white',
            'px-8 py-2 rounded hover:bg-primary/50 mb-10'
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={clsx(
              selectedCategory === category
                ? 'bg-primary/60 text-white'
                : 'bg-primary text-white',
              'px-4 py-2 rounded hover:bg-primary/50 mb-10'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-10 h-full">
        {filterPostsByCategory()
          .slice(0, visibleBlogs)
          .map((post, id) => (
            <BlogCard post={post} key={id} />
          ))}
        {visibleBlogs < filterPostsByCategory().length && (
          <div className="flex justify-center">
            <Button
              onClick={showMoreBlogs}
              text="Show more"
              aria="Show more blog posts"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Posts;
