import { blogData } from '@/constants/blogData';
// import BlogCard from './BlogCard';
import Link from 'next/link';
import Image from 'next/image';
import Overlay from '../ui/Overlay';
import Tag from '../ui/Tag';
import { PostTypes } from '@/types/postTypes';
import { formatDate } from '@/app/utils/formatDate';

const TopPost: React.FC<{ posts: PostTypes[] }> = ({ posts }) => {
  // const topPosts = blogData.filter((blogData) => blogData.topPost === true);

  const topPosts = posts.filter((post) => post.topPost === true);

  return (
    <section aria-labelledby="top-post">
      <div className="w-full text-center">
        <h2
          id="top-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px-2 mb-10"
        >
          Top Posts
        </h2>
      </div>

      <div className="flex h-full flex-col gap-12 items-center">
        {topPosts.map((post, id) => (
          // <Link
          //   href={{ pathname: `blog/${post.id}`, query: { ...post } }}
          //   key={id}
          // >
          <Link href={`/blog/${post.id}`} key={id}>
            <article>
              <div className="relative cursor-pointer">
                {post.img && (
                  <Image
                    src={post.img}
                    width={800}
                    height={800}
                    alt={`image for ${post.title}`}
                  />
                )}
                <Overlay />
              </div>

              <div className="w-full flex justify-center">
                <Tag text={post.category} />
              </div>

              <h3 className="font-extrabold uppercase text-tertiary text-center">
                {post.title}
              </h3>

              <div className="flex gap-3 justify-center mt-2">
                <span className="font-light">By: {post.User.name}</span>

                <span className="italic font-light">
                  {/* {post.createdAt.toLocaleString()} */}
                  {formatDate(post.createdAt.toString())}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopPost;
