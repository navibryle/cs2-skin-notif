import assert from 'assert';
import { type NextPageContext } from 'next';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { convertToDbForm, convertToFrontEndForm, getLastPathOfUrl, getPathToPic } from '~/utils/util';

type Prices = {
    fNew: string;
    fTesteted: string;
    minWear: string;
    wellWorn: string;
    bScarred: string;
};

function getNamesFormUrl(path :string){
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

async function getMarketPrice(gunName:string,skinName:string,marketTier:string){
    marketTier = " ("+marketTier+")";
   const steamData =  await fetch("https://steamcommunity.com/market/priceoverview/?country=CA&currency=1&appid=730&market_hash_name=".concat(convertToFrontEndForm(gunName)).concat(" | ").concat(convertToFrontEndForm(skinName)).concat(marketTier));
   const {lowest_price} = await steamData.json() as {lowest_price:Promise<string>};
   return await lowest_price;
}

function validatePrice(price :string){
    if (price === undefined){
        return "Unknown";
    }
    return price;
}

function validatePrices(prices :Prices) : Prices{
    return {
        fNew : validatePrice(prices.fNew),
        fTesteted : validatePrice(prices.fTesteted),
        minWear: validatePrice(prices.minWear),
        wellWorn: validatePrice(prices.wellWorn),
        bScarred: validatePrice(prices.bScarred)
    }
}

export async function getServerSideProps(context:NextPageContext){
    if (context.req?.url === undefined){
        throw Error("wtf");
    }
    const marketTiers = ["Factory New","Field-Tested","Minimal Wear","Well-Worn","Battle-Scarred"];
    const pricesRes : Array<Promise<string>> = [];
    const [gunName,skinName] = getNamesFormUrl(context.req?.url) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    for (const i of marketTiers ){
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
    return {props:validatePrices(prices)};
}
export default function Page(props: Prices) {
  const path = usePathname();
  if (path !== null){
      const [gunName,skinName] = getNamesFormUrl(path) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
      return (
        <div className="h-lvh">
            <div className="flex flex-row h-full">
                <div className="flex flex-1 flex-col justify-center">
                    <div id ="pic" >
                        <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700}/>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <div>
                        <h1>Steam Prices</h1>
                    </div>
                    <div>
                        Factory New: {props?.fNew}<br/>
                        Minimal Wear: {props?.minWear}<br/>
                        Field-Tested: {props?.fTesteted}<br/>
                        Well-Worn: {props?.wellWorn}<br/>
                        Battle-Scarred: {props?.bScarred}
                    </div>
                </div>
            </div>
        </div>
      )  
  }else{
      return <div>error</div>;
  }
}
