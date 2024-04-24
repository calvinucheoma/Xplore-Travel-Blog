// import { blogData } from '@/constants/blogData';
import Tag from '../ui/Tag';
import Image from 'next/image';
import Overlay from '../ui/Overlay';
import Link from 'next/link';
import { PostTypes } from '@/types/postTypes';
import { formatDate } from '@/app/utils/formatDate';

const Hero: React.FC<{ posts: PostTypes[] }> = ({ posts }) => {
  // const featuredPosts = blogData.filter((blog) => blog.featured === true);

  const featuredPosts = posts.filter((post) => post.featured === true);

  const topFeatured = featuredPosts.slice(0, 1);

  const bottomFeatured = featuredPosts.slice(1, 4);

  return (
    <section className="relative">
      <div className="w-[95%] mx-auto max-w-[1450px] z-1">
        {topFeatured.map((post) => (
          <article
            key={post.id}
            className="flex flex-col gap-5 mb-5 text-center relative"
          >
            <Tag text={post.category} />

            <h2 className="text-6xl font-extrabold uppercase text-tertiary">
              {post.title}
            </h2>

            <div className="flex items-center gap-3 font-light text-tertiary justify-center">
              {post.User.image && (
                <Image
                  src={post.User.image}
                  height={50}
                  width={50}
                  alt={`Image of ${post.User.name}`}
                  className="rounded-full drop-shadow-lg"
                />
              )}
              <span>{post?.User?.name}</span>
              <span className="italic">
                {formatDate(post.createdAt as string)}
              </span>
              {/* <span className="italic">{post.createdAt.toLocaleString()}</span> */}
            </div>

            {/* <Link href={{ pathname: `blog/${post.id}`, query: { ...post } }}> */}
            <Link href={`/blog/${post.id}`}>
              <div className="relative max-h-[600px] overflow-hidden shadow-xl">
                {post.img && (
                  <Image
                    src={post.img}
                    alt={`image for ${post.title}`}
                    className="object-cover w-full h-full"
                    layout="responsive"
                    width={0}
                    height={0}
                  />
                )}
                <Overlay />
              </div>
            </Link>
          </article>
        ))}

        <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-1">
          {bottomFeatured.map((post, id) => (
            <article
              key={id}
              className="flex flex-col gap-3 items-center text-center relative"
            >
              {/* <Link href={{ pathname: `blog/${post.id}`, query: { ...post } }}> */}
              <Link href={`/blog/${post.id}`}>
                <div className="relative overflow-hidden h-72 shadow-xl width-full">
                  {post.img && (
                    <Image
                      src={post.img}
                      alt={`image for ${post.title}`}
                      className="object-cover w-full h-full"
                      // layout="responsive"
                      width={400}
                      height={400}
                    />
                  )}
                  <Overlay />
                </div>
              </Link>

              <Tag text={post.category} />

              <h3 className="text-sm font-extrabold uppercase text-tertiary px-5">
                {post.title}
              </h3>

              <span className="font-light">
                By: {post.User.name},{' '}
                <span className="font-light italic">
                  {formatDate(post.createdAt.toString())}
                </span>
              </span>

              {/* <span className="font-light italic">
                {formatDate(post.createdAt as string)}
              </span> */}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
