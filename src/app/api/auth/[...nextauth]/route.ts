import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

const handler = NextAuth({
  theme: { logo: "/images/logo-circle.png" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user || !user.hashedPassword) {
          return null
        }
        const isPasswordValid = await compare(credentials.password, user.hashedPassword)
        if (!isPasswordValid) {
          return null
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { accounts: true },
          })
          if (!existingUser) {
            // Create new user
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || "",
                image: user.image || "",
                accounts: {
                  create: {
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    access_token: account.access_token,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                  },
                },
              },
            })
            console.log("Created new user with Google account:", newUser)
          }
          // Check if account record exists
          const userToCheck = existingUser || (await prisma.user.findUnique({ where: { email: user.email! }, include: { accounts: true } }))
          const existingAccount = userToCheck?.accounts.find(
            (acc) => acc.provider === account.provider && acc.providerAccountId === account.providerAccountId
          )
          if (!existingAccount) {
            // Create account record for existing user
            await prisma.account.create({
              data: {
                userId: userToCheck!.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            })
            console.log("Added Google account to existing user:", userToCheck!.id)
          }
          return true
        } catch (error) {
          console.error("Error during Google sign in:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account, trigger, session }) {
      // 'user' is only present the first time the JWT is created (on sign in)
      if (user) {
        token.id = user.id; // Store the user's ID from the 'user' object into the JWT token
      }

      if (trigger === "update") {
        // This part is for when session.update() is called
        token.name = session.user.name;
        // If you need to update other properties, add them here
      }

      if (account?.access_token) {
        // Add provider-specific access token if available
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Transfer properties from the JWT token to the session object
      if (token?.id) {
        session.user.id = token.id; // Assign the ID from the token to session.user.id
      }
      // You might also want to explicitly ensure other properties are present from token
      if (token?.email) {
        session.user.email = token.email;
      }
      if (token?.name) {
        session.user.name = token.name;
      }
      if (token?.image) {
        session.user.image = token.image;
      }
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }