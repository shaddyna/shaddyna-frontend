import { SessionOptions } from "iron-session";

export interface SessionData {
  token?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  cookieName: "shaddyna-cookie",
  password: "sytagudioausydtweaugdyh8taywudhq0j9wed87w8q6e799dipqaKSh",
  cookieOptions: {
    httpOnly: true,
    secure: false,
  },
  ttl: 3600 * 7,
};
