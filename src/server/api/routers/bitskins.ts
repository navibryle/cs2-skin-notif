
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { synchronizedBitskinPrices } from "~/services/bitskinsService";
export const bitskinsRouter = createTRPCRouter({
  synchronize : publicProcedure.query(
    async () => {
      await synchronizedBitskinPrices();
    }
  ),
  getSkin:publicProcedure.input(z.object({gunName:z.string(),skinName:z.string()})).query(
    async({ctx,input}) => {
      return ctx.db.bITSKINS.findMany({
        select:{
          NAME:true,
          AVG_PRICE:true,
        },
        where:{
          AND:[
            {
              NAME:{
                contains:input.gunName,
              }
            },
            {
              NAME:{
                contains:input.skinName
              }
            }
          ]
        }
      })
    }
  )

})
