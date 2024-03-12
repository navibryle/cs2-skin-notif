import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from 'zod';

export const steamRouter = createTRPCRouter({
  getSkins : publicProcedure.input(z.string()).query( async ({ctx,input}) => {
    return await ctx.db.sKINS.findMany({
    select:{
      NAME: true,
      GUN_NAME: true
    },
    where:{
      GUN_NAME:{
        equals:input
      }
    },
    })
  }),
  getAllGunNames : publicProcedure.query( async ({ctx}) => {
    const res = await ctx.db.sKINS.findMany({
      select:{
        GUN_NAME:true
      },
      distinct:"GUN_NAME"
    });
    return res;

  })
})
