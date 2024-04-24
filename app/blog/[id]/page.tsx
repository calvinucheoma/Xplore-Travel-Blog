import { formatDate } from '@/app/utils/formatDate';
import Tag from '@/components/ui/Tag';
import { PostTypes } from '@/types/postTypes';
import Image from 'next/image';
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';

const getData = async (id: string) => {
  const res = await fetch(
    // `http://localhost:3000/api/post/${id}`,
    `https://xplore-travel-blog.vercel.app/api/post/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
};

const BlogPage = async ({ params }: { params: PostTypes }) => {
  const { id } = params;

  const post = await getData(id);

  return (
    <div className="w-[95%] mx-auto max-w-[1450px]">
      <div className="w-full relative mb-5 h-[400px]">
        <Image src={post.img} fill alt="blog image" className="object-cover" />
      </div>

      <Tag text={post.category} />

      <h2 className="text-4xl font-extrabold uppercase text-tertiary my-3">
        {post.title}
      </h2>

      <div className="flex md:gap-20 gap-5 relative mt-10 md:flex-row flex-col">
        <aside className="md:sticky md:top-2/4 md:h-screen">
          <span className="uppercase text-2xl font-extrabold text-tertiary">
            Share:
          </span>
          <div className="flex text-3xl gap-5 text-gray-400 mt-2 [&>*]:border">
            <AiOutlineFacebook />
            <AiOutlineInstagram />
            <AiOutlineTwitter />
          </div>
        </aside>

        <article>
          <p className="text-xl">{post.desc}</p>

          <div className="mt-5 flex gap-5 items-center">
            <Image
              src={post.User.image}
              width={500}
              height={500}
              alt={`Image of ${post.User.name}`}
              className="rounded-full w-20 h-20 object-cover"
            />
            <div className="flex gap-1 flex-col">
              <span>{post.User.name}</span>
              <span>{formatDate(post.createdAt.toString())}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPage;

// '[&>*]:' this tailwind class is used to grab all of the children in the element it is used within
