import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const authResponse = await axios.post(
          `${process.env.AUTH_URL}/api/login`,
          {
            id: credentials.username,
            password: credentials.password,
          }
        );
        console.log("1", authResponse.data);
        if (authResponse.status !== 200) {
          return null;
        }

        return {
          email: authResponse.data.id,
          name: authResponse.data.nickname,
          image: authResponse.data.image,
          ...authResponse.data,
        };
      },
    }),
  ],
});
