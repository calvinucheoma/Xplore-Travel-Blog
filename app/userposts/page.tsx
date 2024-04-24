import BlogCard from '@/components/shared/BlogCard';
import getCurrentUser from '../actions/getCurrentUser';
import prisma from '../utils/prisma';
import DeletePosts from '@/components/shared/DeletePosts';

const UserPostsPage = async () => {
  const user = await getCurrentUser();

  const posts = await prisma.blog.findMany({
    where: {
      userEmail: user?.email ?? undefined,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      User: true,
    },
  });

  return (
    <div className="w-full">
      {!user ? (
        <h1 className="text-3xl font-extrabold text-center flex items-center justify-center h-screen">
          Sign in to view your posts
        </h1>
      ) : (
        <div className="max-w-[90%] mx-auto">
          <div className="w-full text-center mb-10">
            <h1 className="text-3xl font font-extrabold text-tertiary">
              Hello, <span className="text-primary">{user?.name}</span>
            </h1>
            <span className="text-lg">
              You have published{' '}
              <span className="text-primary font-bold">{posts.length}</span>{' '}
              post
              {posts.length === 1 ? '' : 's'}
            </span>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-10">
            {posts.map((post) => (
              <div className="relative" key={post.id}>
                <BlogCard post={post as any} />
                <DeletePosts post={post as any} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPostsPage;
