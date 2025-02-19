/*import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}*/

/*export default async function getSession() {
  try {
    // Check sessionStorage first (client-side)
    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("user") || localStorage.getItem("user");

      if (userData) {
        return JSON.parse(userData); // Convert string to object
      }
    }

    // If no session is found, return null
    return null;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}*/

/*const getSession = (): { user: { email: string; token: string } } | null => {
  if (typeof window === "undefined") {
    return null; // Prevent server-side errors
  }

  try {
    const userData =
      sessionStorage.getItem("user") || localStorage.getItem("user");

    if (!userData) return null;

    const parsedUser = JSON.parse(userData);
    return parsedUser?.user?.token ? parsedUser : null;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};

export default getSession;*/

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret"; // Use a real secret key

const getSession = async () => {
  try {
    // Await cookies() to resolve the promise
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log("No token found in cookies");
      return null;
    }

    console.log("✅ Token found in cookies:", token);

    // Decode the token to get the user's ID
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    if (!decoded?.id) {
      console.log("❌ Invalid token: No id found in token payload");
      return null;
    }

    console.log("✅ Decoded User id from Token:", decoded.id);

    return { user: { id: decoded.id } };
  } catch (error) {
    console.error("❌ Error fetching session from cookies:", error);
    return null;
  }
};

export default getSession;