import CreateForm from '@/components/shared/CreateForm';
import getCurrentUser from '../actions/getCurrentUser';
import { User } from '@prisma/client';

const CreatePostPage = async () => {
  const user = await getCurrentUser();

  return <CreateForm user={user as User} />;
};

export default CreatePostPage;
