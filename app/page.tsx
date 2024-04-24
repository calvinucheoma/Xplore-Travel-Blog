import Hero from '@/components/shared/Hero';
import LatestPost from '@/components/shared/LatestPost';
import TopPost from '@/components/shared/TopPost';
import prisma from './utils/prisma';

export default async function Home() {
  const posts = await prisma.blog.findMany({
    include: {
      User: true,
    },
  });
  return (
    <>
      <Hero posts={posts} />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 w-[95%] mx-auto max-w-[1450px] overflow-y-hidden h-fit mt-10">
        <LatestPost posts={posts} />
        <TopPost posts={posts} />
      </div>
    </>
  );
}
