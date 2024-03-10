import assert from 'assert';
import { type NextPageContext } from 'next';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { bitskinsPrice } from '~/services/bitskinsService';
import { getNamesFormUrl, steamPrice } from '~/services/steamService';
import { type GetSkinPrice, type Prices } from '~/utils/types';
import { getPathToPic } from '~/utils/util';


export async function getServerSideProps(context:NextPageContext){
    if (context.req?.url === undefined){
        throw Error("wtf");
    }
    let [gunName,skinName] = getNamesFormUrl(context.req?.url) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    if (skinName.includes(".json")){
        skinName = skinName.replace(".json","");
    }
    await bitskinsPrice(gunName,skinName);
    const marketList: Array<GetSkinPrice> = [steamPrice,bitskinsPrice];
    assert(marketList[0] !== undefined);
    assert(marketList[1] !== undefined);
    const tmp = { 
        props:{
            steam:await marketList[0](gunName,skinName),
            bitskins:await marketList[1](gunName,skinName)
            }
        };
    return tmp;
}

export default function Page(props: {steam:Prices,bitskins:Prices}) {
    console.warn("DEBUGPRINT[13]: [gunName].tsx:28 (after export default function Page(props: stea…)")
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
                        Factory New: {props.steam?.fNew}<br/>
                        Minimal Wear: {props.steam?.minWear}<br/>
                        Field-Tested: {props.steam?.fTesteted}<br/>
                        Well-Worn: {props.steam?.wellWorn}<br/>
                        Battle-Scarred: {props.steam?.bScarred}
                    </div>
                    <br/>
                    <div>
                        <h1>Bitskins prices</h1>
                    </div>
                    <div>
                        Factory New: {props.bitskins?.fNew}<br/>
                        Minimal Wear: {props.bitskins?.minWear}<br/>
                        Field-Tested: {props.bitskins?.fTesteted}<br/>
                        Well-Worn: {props.bitskins?.wellWorn}<br/>
                        Battle-Scarred: {props.bitskins?.bScarred}
                    </div>
                </div>
            </div>
        </div>
      )  
  }else{
    return <div>error</div>;
  }
}
