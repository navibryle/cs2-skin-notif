import { db } from "~/server/db";
import { type BitskinEntry, type GetSkinPrice,type Prices } from "~/utils/types";


export const synchronizedBitskinPrices = async () => {
    console.warn("DEBUGPRINT[3]: bitskinsService.ts:24 (after export const synchronizedBitskinPrices =…)")
    const bitskinsData = await fetch("https://api.bitskins.com/market/insell/730", {
      "headers": {
        "content-type": "application/json",
      },  
      "method": "GET",
    });
    const json:{list:Array<BitskinEntry>} = await bitskinsData.json() as {list:Array<BitskinEntry>};
    for (const entry of json.list){
        await db.bITSKINS.upsert(
            {
                where:{ID:entry.skin_id},
                update :{
                    AVG_PRICE:entry.price_avg
                },
                create: {
                    ID:entry.skin_id,
                    NAME:entry.name,
                    AVG_PRICE: entry.price_avg
                }
            }
        )
    }
}


export const bitskinsPrice : GetSkinPrice = async (gunName :string, skinName :string) =>{
    console.log(await db.bITSKINS.findMany({
                select:{
                    NAME:true,
                    AVG_PRICE:true,
                },
                where:{
                    AND:[
                        {
                            NAME:{
                                contains:gunName,
                            }
                        },
                        {
                            NAME:{
                                contains:skinName
                            }
                        }
                    ]
                }
            }))
    const tmp: Prices = {
        fNew:"1",
        fTesteted:"1",
        wellWorn:"1",
        bScarred:"1",
        minWear:"1"
    };
    return tmp;
}
