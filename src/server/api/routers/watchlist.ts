
import { WatchlistCreateQuerySchema } from "~/utils/types";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type PrismaClient, type Prisma } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { type Session } from "next-auth";

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
    getWatchlistForUser : publicProcedure.input(WatchlistCreateQuerySchema).mutation(
      async({ctx,input}) => {
        return await ctx.db.wATCHLIST.create(
          {
            data:{
              SKIN_ID:await getSkinId(input.skinName,input.gunName,ctx),
              USER_ID: await getUser(input.email,ctx),
            }
          }
        )
      }
    )
  }
)