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
    const [gunName,skinName] = getNamesFormUrl(context.req?.url) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    await bitskinsPrice(gunName,skinName);
    const marketList: Array<GetSkinPrice> = [steamPrice];
    assert(marketList[0] !== undefined);
    return { props:marketList[0](gunName,skinName)};
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
