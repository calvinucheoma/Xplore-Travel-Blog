'use client';

import { User } from '@prisma/client';
import Form from '../ui/Form';
import Input from '../ui/Input';
import { useEdgeStore } from '@/lib/edgestore';
import { useCallback, useEffect, useState } from 'react';
import Button from '../ui/Button';
import { SingleImageDropzone } from '../ui/SingleImageDropzone';
import { userTypes } from '@/types/userTypes';
import { createPost } from '@/app/actions/blogActions';

// interface CreateFormProps {
//   user: User;
// }

const CreateForm = ({ user }: { user: userTypes }) => {
  const [file, setFile] = useState<File>();

  const { edgestore } = useEdgeStore();

  const [imagePath, setImagePath] = useState('');

  // const uploadImageHandler = async () => {
  //   if (file) {
  //     const res = await edgestore.publicFiles?.upload({
  //       file,
  //     });
  //     setImagePath(res?.url);
  //   }
  // };

  useEffect(() => {
    const uploadImageHandler = async () => {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });
        setImagePath(res?.url);
      }
    };

    if (file) {
      uploadImageHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div className="mt-8 mx-auto w-full max-w-3xl px-4">
      <div className="bg-white py-8 shadow rounded-lg px-10">
        <h1 className="text-center text-2xl font-extrabold mb-10">
          Create a Post ✍️
        </h1>
        {!user ? (
          <h2 className="text-center text-xl font-extrabold uppercase">
            Please sign up or log in to create a post
          </h2>
        ) : (
          <>
            <SingleImageDropzone
              onChange={(file) => {
                setFile(file);
              }}
              value={file as File | undefined}
              width={200}
              height={200}
            />
            <Form
              action={createPost}
              className="flex flex-col gap-5 mt-5"
              onSubmit={() => setFile(undefined)}
            >
              <Input type="hidden" name="image" value={imagePath} />
              <Input name="title" type="text" placeholder="Enter title" />
              <textarea
                name="description"
                required
                rows={10}
                placeholder="Write here..."
                className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5 resize-none"
              ></textarea>
              <select
                name="category"
                required
                defaultValue=""
                className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"
              >
                <option value="" disabled>
                  Choose Tag
                </option>
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Journey">Journey</option>
                <option value="Discovery">Discovery</option>
                <option value="Wanderlust">Wanderlust</option>
              </select>
              <Input name="email" type="hidden" value={user?.email || ''} />

              <Button type="submit" text="Create" aria="create blog" />
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
