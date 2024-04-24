import prisma from '@/app/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  id: string;
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const { id } = params;

  try {
    const post = await prisma.blog.findUnique({
      where: {
        id: id,
      },
      include: {
        User: true,
      },
    });

    return new NextResponse(JSON.stringify(post, null, 2), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, null, 2),
      { status: 500 }
    );
  }
};
