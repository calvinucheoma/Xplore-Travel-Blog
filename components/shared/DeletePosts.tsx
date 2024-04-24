'use client';

import { PostTypes } from '@/types/postTypes';
import { useState } from 'react';
import Button from '../ui/Button';
import { deletePost } from '@/app/actions/blogActions';
import Input from '../ui/Input';

const DeletePosts: React.FC<{ post: PostTypes }> = ({ post }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button aria="delete post" text="Delete" action onClick={handleDelete} />
      {showModal && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div className="w-screen h-screen absolute bg-black/40" />
            <div
              className="bg-white p-6 rounded shadow-lg z-40 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p>Are you sure you want to delete this post?</p>
              <div className="flex gap-3 mt-5">
                <form action={deletePost} onSubmit={closeModal}>
                  <Input name="postId" type="hidden" value={post.id} />
                  <Button aria="delete post" type="submit" text="Yes" />
                </form>
                <Button
                  aria="cancel delete post functionality"
                  onClick={closeModal}
                  text="No"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeletePosts;

// e.stopPropagation() stops the div from closing when we click on it. Only the outside div(the overlay) closes when clicked.
