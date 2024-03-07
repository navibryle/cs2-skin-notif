import { type BitskinEntry, type GetSkinPrice } from "~/utils/types";

export const bitskinsPrice : GetSkinPrice = async (gunName :string, skinName :string) => {

    const bitskinsData = await fetch("https://api.bitskins.com/market/insell/730", {
      "headers": {
        "content-type": "application/json",
      },  
      "method": "GET",
    });
    const json:Array<BitskinEntry> = await bitskinsData.json() as Array<BitskinEntry>;
    console.log(json);
    return {
        fNew:"a",
        fTesteted:"",
        minWear:"",
        wellWorn:"",
        bScarred:""
    };
}

const synchronizedBitskinPrices = () => {
    console.log("hello");
}
