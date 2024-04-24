import Posts from '@/components/shared/Posts';
import TopPost from '@/components/shared/TopPost';
import prisma from '../utils/prisma';

const PostsPage = async () => {
  const posts = await prisma.blog.findMany({
    include: {
      User: true,
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 w-[95%] mx-auto max-w-[1450px] overflow-y-hidden h-fit mt-10 max-lg:space-y-7">
      <Posts posts={posts} />
      <TopPost posts={posts} />
    </div>
  );
};

export default PostsPage;
