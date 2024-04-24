'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../utils/prisma';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const userEmail = formData.get('email') as string;
  const image = formData.get('image') as string;

  await prisma.blog.create({
    data: {
      img: image,
      title: title,
      desc: description,
      category: category,
      userEmail: userEmail,
    },
  });

  revalidatePath('/create');
}

export async function deletePost(formData: FormData) {
  const id = formData.get('postId') as string;

  await prisma.blog.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/userposts');
}
