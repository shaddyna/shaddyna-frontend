/*import prisma from '@/libs/prismadb';
import getSession from './getSession';

const getUsers = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.id) return [];

    // Get all users except the current user
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          id: session.user.id as string,
        },
      },
    });

    if (!users) return [];

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;*/



/*import prisma from '@/libs/prismadb';
import getSession from './getSession';

const getUsers = async () => {
  try {
    // Log the session to see if it's being fetched correctly
    const session = await getSession();
    console.log('Session:', session);

    // If no valid session, log and return an empty array
    if (!session?.user?.id) {
      console.log('No valid session or id found');
      return [];
    }

    // Log the id of the currently logged-in user
    console.log('Current User id:', session.user.id);

    // Get all users except the current user
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          id: session.user.id as string,
        },
      },
    });

    // Log the users fetched from the database
    console.log('Fetched Users:', users);

    // If no users are found, log and return an empty array
    if (!users || users.length === 0) {
      console.log('No users found');
      return [];
    }

    return users;
  } catch (error: any) {
    // Log any errors that occur
    console.error('Error fetching users:', error);
    return [];
  }
};

export default getUsers;*/

/*import prisma from "@/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  try {
    console.log("Fetching session...");
    const session = await getSession();

    if (!session?.user?.id) {
      console.log("No session found.");
      return [];
    }

    console.log(`Session found for user: ${session.user.id}`);
    console.log("Fetching users from database...");

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        NOT: { id: session.user.id as string },
      },
    });

    console.log("Users fetched successfully:", users.length);
    return users;
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    console.error("Prisma Error Details:", error);
    return [];
  }
};

export default getUsers;*/

/*import prisma from "@/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  try {
    const session = await getSession();
    console.log("Session:", session);

    if (!session?.user?.id) {
      console.log("No valid session or id found");
      return [];
    }

    console.log("Current User id:", session.user.id);

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { NOT: { id: session.user.id } },
    });

    console.log("Fetched Users:", users);
    return users.length > 0 ? users : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getUsers;*/

import prisma from "@/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  try {
    const session = await getSession();

    console.log("Server: Session:", session);

    if (!session?.user?.id) {
      console.log("No valid session or user ID found");
      return [];
    }

    // Fetch user details using ID
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id }, // Use ID instead of id
    });

    if (!currentUser) {
      console.log("No user found with this ID");
      return [];
    }

    console.log("Current User id:", currentUser.id);

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { NOT: { id: currentUser.id } },
    });

    console.log("Fetched Users:", users);
    return users.length > 0 ? users : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getUsers;
