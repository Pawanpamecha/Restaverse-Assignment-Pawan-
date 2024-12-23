import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/log-in",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
