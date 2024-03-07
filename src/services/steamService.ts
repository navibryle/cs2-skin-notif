import assert from "assert";
import { type GetSkinPrice, type Prices } from "~/utils/types";
import { convertToDbForm, convertToFrontEndForm, getLastPathOfUrl } from "~/utils/util";
import { marketTiers } from "./constants";

export const steamPrice : GetSkinPrice = async (gunName :string, skinName :string) => {
    const pricesRes : Array<Promise<string | null>> = [];
    for (const i of marketTiers ) {
        pricesRes.push(getMarketPrice(gunName,skinName,i));
    }
    assert(pricesRes.length === 5);
    const prices = {
        fNew: await pricesRes[0]!,
        fTesteted: await pricesRes[1]!,
        minWear: await pricesRes[2]!,
        wellWorn: await pricesRes[3]!,
        bScarred: await pricesRes[4]!
    };
    return validatePrices(prices);
}

export function getNamesFormUrl(path :string){
  if (path === null || path === undefined){
    throw Error("wtf");
  }
  let [gunName,skinName] = getLastPathOfUrl(path).split("_");
  if (gunName === undefined || skinName === undefined){
      throw Error("wtf");
  }
  gunName = convertToDbForm(decodeURI(gunName));
  skinName = convertToDbForm(decodeURI(skinName));
  return [gunName,skinName]
}

export async function getMarketPrice(gunName:string,skinName:string,marketTier: string){
    marketTier = " ("+marketTier+")";
   const steamData =  await fetch("https://steamcommunity.com/market/priceoverview/?country=CA&currency=1&appid=730&market_hash_name=".concat(convertToFrontEndForm(gunName)).concat(" | ").concat(convertToFrontEndForm(skinName)).concat(marketTier),
       {next:{revalidate:300}} // revalidate the request every 5 mins
   );
   try{
       const {lowest_price} = await steamData.json() as {lowest_price:Promise<string> | null};
       return await lowest_price;
   }catch( e ){
        return "Unknown";
   }
}

function validatePrice(price :string | null){
    if (price === undefined || price === null){
        return "Unknown";
    }
    return price;
}

export function validatePrices(prices :Prices) : Prices {
    return {
        fNew : validatePrice(prices.fNew),
        fTesteted : validatePrice(prices.fTesteted),
        minWear: validatePrice(prices.minWear),
        wellWorn: validatePrice(prices.wellWorn),
        bScarred: validatePrice(prices.bScarred)
    }
}
