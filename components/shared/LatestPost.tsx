'use client';

// import { blogData } from '@/constants/blogData';
import BlogCard from './BlogCard';
import { useState } from 'react';
import Button from '../ui/Button';
import { PostTypes } from '@/types/postTypes';

const LatestPost: React.FC<{ posts: PostTypes[] }> = ({ posts }) => {
  // const latestPost = blogData.filter((blog) => blog.latestPost === true);

  const latestPost = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [visibleBlogs, setVisibleBlogs] = useState(5);

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
  };
  return (
    <section className="col-span-2" aria-labelledby="latest-post">
      <div className="w-full text-center">
        <h2
          id="latest-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px-2 mb-10"
        >
          Latest Posts
        </h2>
      </div>

      <div className="flex flex-col gap-10 h-full">
        {latestPost.slice(0, visibleBlogs).map((post, id) => (
          <BlogCard post={post as any} key={id} />
        ))}
        {visibleBlogs < latestPost.length && (
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

export default LatestPost;
