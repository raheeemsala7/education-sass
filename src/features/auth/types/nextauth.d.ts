import { IUser } from "./auth";


declare module "next-auth" {


  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    access_token: string;
    user: IUser;
    role: string;
  }


  interface Session {
    user: IUser
    access_token: string;
    role: string;
  }
}



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: IUser;
    access_token: string;
    role: string;
  }
}