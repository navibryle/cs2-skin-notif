import input from "postcss/lib/input";
import {  BitskinEntryZodSchema } from "~/utils/types";

import { createTRPCRouter, publicProcedure } from "../trpc";
export const bitskinsRouter = createTRPCRouter({
    addSkin : publicProcedure.input(BitskinEntryZodSchema).query(async ({ctx,input}) => {
        ctx.db.bITSKINS
    })
})
