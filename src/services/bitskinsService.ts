import { db } from "~/server/db";
import { type BitskinEntry, type GetSkinPrice, type Prices } from "~/utils/types";
import { marketTiers } from "./constants";


export const synchronizedBitskinPrices = async () => {
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

const addDecimalPoint = (num:string) => {
  if (num.length <= 3){
    while(num.length <= 3){
      num = "0"+num;
    }
  }
  return num.slice(0,-3)+"."+num.slice(-3);
}


const getTierfromMap = (priceMap: Map<string,bigint>,tier: string) : string => {
  if (priceMap.has(tier)){
    return "$"+addDecimalPoint(priceMap.get(tier)?.toString() ?? "Unknown")+" USD";
  }
  return "No listings";
}

export const bitskinsPrice : GetSkinPrice = async (gunName :string, skinName :string) =>{
  const prices: Array<{NAME:string,AVG_PRICE:bigint}> = await db.bITSKINS.findMany({
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
      })
  const priceMap = new Map<string,bigint>();
  for (const item of prices){
    for (const tier of marketTiers){
      if (item.NAME.toLowerCase().toLowerCase().includes(tier.toLowerCase())){
        priceMap.set(tier,item.AVG_PRICE);
      }
    }
  }
  const tmp: Prices = {
    fNew:getTierfromMap(priceMap,marketTiers[0]!),
    fTesteted:getTierfromMap(priceMap,marketTiers[1]!),
    wellWorn:getTierfromMap(priceMap,marketTiers[2]!),
    bScarred:getTierfromMap(priceMap,marketTiers[3]!),
    minWear:getTierfromMap(priceMap,marketTiers[4]!)
  };
  console.warn("DEBUGPRINT[15]: bitskinsService.ts:70 (after ;)")
  console.log(tmp);
  return tmp;
}
