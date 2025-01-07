"use server";

import axios, { AxiosError } from "axios";
import { ZodError, z } from "zod";
import { loginSchema, registerSchema } from "@/components/schema/auth-schema";
import {
  defaultSession,
  SessionData,
  sessionOptions,
} from "../utils/iron-session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export type ResponseObject = {
  msg?: string;
  error?: string;
};

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const loginAction = async (
  data: z.infer<typeof loginSchema>,
): Promise<ResponseObject> => {
  const session = await getSession();

  try {
    await loginSchema.parseAsync(data);

    const res = await axios.post(
      `${API_URL}/api/customer/customer-login`,
      data,
    );

    const auth: SessionData = res.data;
    session.token = auth.token;
    session.isLoggedIn = true;

    await session.save();

    return { msg: "Login successful" };
  } catch (error: any) {
    console.log("[AUTH_ERROR]", error.message);
    if (error instanceof ZodError) {
      return { error: error.errors[0]?.message };
    } else if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        return { error: error.response.data.message };
      } else if (error.response?.data?.error_description) {
        return { error: error.response.data.error_description };
      }
    }

    return { error: "Something went wrong, try again" };
  }
};

export const registerAction = async (
  data: z.infer<typeof registerSchema>,
): Promise<ResponseObject> => {
  try {
    await registerSchema.parseAsync(data);

    const res = await axios.post(
      `${API_URL}/api/customer/customer-register`,
      data,
    );

    return { msg: "Registration successful" };
  } catch (error: any) {
    console.log("[REGISTER_ERROR]", error.message);
    if (error instanceof ZodError) {
      return { error: error.errors[0]?.message };
    } else if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        return { error: error.response.data.message };
      }
    }

    return { error: "Something went wrong, try again" };
  }
};

export const logoutAction = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};

/*export const getCurrentUser = async () => {
  const session = await getSession();

  console.log({ session });

  if (!session.token) {
    return null;
  }

  const user: any | null = jwtDecode(session?.token || "");

  return user;
};*/

export const getCurrentUser = async () => {
  const session = await getSession();

  console.log({ session }); // Log the entire session object to inspect

  if (!session?.token) {
    console.log("No token found in session.");
    return null;
  }

  try {
    // Decode the JWT token to get the user data
    const user: any = jwtDecode(session.token);

    // Extract the userId, ensuring _id is treated as a string (in case it's an ObjectId)
    const userId = user.id ? user.id.toString() : null;// Convert ObjectId to string
    const customerName = user.name; // Assuming name represents the customer's name

    // Log the extracted userId and customerName
    console.log("Decoded user data:", { userId, customerName });

    return { userId, customerName };
  } catch (error) {
    console.log("Error decoding token:", error);
    return null;
  }
};

/*export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session?.token) {
    console.log("No token found in session.");
    return null;
  }

  try {
    // Decode the JWT token to get the user data
    const user: any = jwtDecode(session.token);

    // Extract the userId, ensuring _id is treated as a string (in case it's an ObjectId)
    const userId = user.id ? user.id.toString() : null; // Convert ObjectId to string
    const customerName = user.name; // Assuming name represents the customer's name
    const email = user.email; // Assuming the email is available in the decoded token

    // Return user info with email
    return { email, userId, customerName };
  } catch (error) {
    console.log("Error decoding token:", error);
    return null;
  }
};*/





export const getAccessToken = async () => {
  const session = await getSession();
  if (!session?.token) return "";

  return `Bearer ${session?.token}`;
};
