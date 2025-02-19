import prisma from '@/libs/prismadb';
import getSession from './getSession';

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.id) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id as string,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;