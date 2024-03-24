
import { type Prisma, type PrismaClient } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { type Session } from "next-auth";
import { z } from 'zod';
import { WatchlistCreateQuerySchema,WatchListQuerySchema } from "~/utils/types";
import { createTRPCRouter, publicProcedure } from "../trpc";

const errorIntro = "Could not add gun to watchlist ";

const getSkinId = async (skinName: string, gunName:string,
    ctx:{
      session: Session | null;
      db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
    }
) => {
  const gunList = await ctx.db.sKINS.findMany(
    {
      select: {
        ID:true
      },
      where:{
        AND:{
          GUN_NAME:{
            equals:gunName
          },
          NAME:{
            equals:skinName
          }
        }
      }
    }
  )
  if (gunList.length > 1 ){
    throw Error(errorIntro.concat("since it matched more than one skin"));
  }else if (gunList.length == 0){
    throw Error(errorIntro.concat("since the skin is not in the database"));
  }else if (!gunList[0]?.ID){
    throw Error(errorIntro.concat(" due to database error"));
  }
  return gunList[0].ID;
}

const getUser = async (email :string,ctx:{
      session: Session | null;
      db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
    } ) => {
  const userList = await ctx.db.user.findMany(
    {
      select:{
        id:true
      },
      where:{
        email:{
          equals:email
        }
      }
    }
  )

  if (userList.length > 1){
    throw Error(errorIntro.concat(" since"));
  }else if(userList.length == 0){
    throw Error(errorIntro.concat(" since the user is not in the database"));
  }else if (!userList[0]?.id){
    throw Error(errorIntro.concat(" due to database error"));
  }

  return userList[0].id;
}

export const watchlistRouter = createTRPCRouter(
  {
    addToUsersWatchlist : publicProcedure.input(WatchlistCreateQuerySchema).mutation(
      async({ctx,input}) => {
        return await ctx.db.wATCHLIST.create(
          {
            data:{
              SKIN_ID: await getSkinId(input.skinName,input.gunName,ctx),
              USER_ID: input.id,
              PRICE:undefined,
              TIER:input.tier
            }
          }
        )
      }
    ),
    getUserWatchlist: publicProcedure.input(z.string()).query( async ({ctx,input}) => {
      return await ctx.db.wATCHLIST.findMany(
        {
          select:{
            PRICE:true,
            TIER:true,
            SKIN:{
              select:{
                NAME:true,
                GUN_NAME:true,
                ID:true
              }
            }
          },
          where:{
            USER_ID:{
              equals: input
            }
          }
        }
      )
    }),
    removeWatchlist: publicProcedure.input(z.object({skinId:z.bigint(),userId:z.string()})).mutation(async ({ctx,input}) => {
      return await ctx.db.wATCHLIST.delete({
        where:{
          SKIN_ID_USER_ID: {USER_ID:input.userId,SKIN_ID:input.skinId}
        }
      })
    }),
    userHasGunOnWatchlist: publicProcedure.input(z.object({skinName:z.string(),gunName:z.string(),id:z.string()})).query( async ({ctx,input}) => {
      return await ctx.db.wATCHLIST.findFirst({
        select:{
          SKIN_ID:true
        },
        where:{
          USER_ID:input.id,
          SKIN:{
            NAME:input.skinName,
            GUN_NAME:input.gunName
          }
        }
      })
    }),
    updateWatchList: publicProcedure.input(WatchListQuerySchema).mutation(async ({ctx,input}) => {
      return await ctx.db.wATCHLIST.update({
        where:{
          SKIN_ID_USER_ID : {SKIN_ID:input.skinId,USER_ID:input.userId}
        },
        data:{
          PRICE:input.price,
          TIER:input.tier
        }
      })
    })
  }
)