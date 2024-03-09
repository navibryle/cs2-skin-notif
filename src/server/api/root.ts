import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { steamRouter } from "./routers/steam";
import { bitskinsRouter } from "./routers/bitskins";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  steam: steamRouter,
  bitskins: bitskinsRouter 
});

// export type definition of API
export type AppRouter = typeof appRouter;
