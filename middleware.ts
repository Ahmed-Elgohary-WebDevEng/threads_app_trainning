import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook/clerk",
    "/favicon.ico",
    "/logo.svg",
    "/assets/community.svg",
    "/assets/home.svg",
    "/assets/search.svg",
    "/assets/heart.svg",
    "/assets/create.svg",
    "/assets/community.svg",
    "/assets/user.svg",
    "/assets/reply.svg",
    "/assets/members.svg",
    "/assets/tag.svg",
    "/assets/reply.svg",
    "/assets/members.svg",
    "/assets/request.svg",
    "/api/uploadthing",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/favicon.ico",
    "/logo.svg",
    "/assets/community.svg",
    "/assets/home.svg",
    "/assets/search.svg",
    "/assets/heart.svg",
    "/assets/create.svg",
    "/assets/community.svg",
    "/assets/user.svg",
    "/assets/reply.svg",
    "/assets/members.svg",
    "/assets/tag.svg",
    "/assets/reply.svg",
    "/assets/members.svg",
    "/assets/request.svg",
    "/api/uploadthing",
  ],
});

export const config = {
  // matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],

  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+.[w]+$|_next).*)",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
