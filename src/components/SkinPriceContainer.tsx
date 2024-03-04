'use server';
//export default async function SkinPriceContainer(gunName:string, skinName:string){
export default async function SkinPriceContainer(){
    // const steamData =  await fetch("https://steamcommunity.com/market/priceoverview/?country=CA&currency=1&appid=730&market_hash_name=MAG-7 | Navy Sheen (Field-Tested)".concat(gunName).concat(" | ").concat(skinName).concat(" (Field-Tested)"));
    const steamData =  await fetch("https://steamcommunity.com/market/priceoverview/?country=CA&currency=1&appid=730&market_hash_name=MAG-7 | Navy Sheen (Field-Tested)");
   const {lowest_price,median_price,success,volume} = await steamData.json() as {lowest_price:string,median_price:string,success:boolean,volume:number};
    return <div>HELLO:{lowest_price}</div>;
}
