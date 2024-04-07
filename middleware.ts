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
  ],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
