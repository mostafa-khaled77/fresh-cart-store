import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/orders/:path*",
  ],
};
