import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Check if the user is authenticated
        if (!token) {
          return false
        }
        return true
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
)

// Protect all routes under these paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    // "/settings/:path*",
    // "/profile/:path*",
  ]
}