import { Button } from '@mui/material';
import { type NextPageContext } from 'next';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { bitskinsPrice } from '~/services/bitskinsService';
import { getNamesFormUrl, steamPrice } from '~/services/steamService';
import { api } from '~/utils/api';
import { type GetSkinPrice, type Prices } from '~/utils/types';
import { getPathToPic } from '~/utils/util';


export async function getServerSideProps(context:NextPageContext){
  if (context.req?.url === undefined){
    throw Error("wtf");
  }
  const [gunName,skinName] = getNamesFormUrl(context.req?.url) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
  await bitskinsPrice(gunName,skinName);
  const marketList: Array<GetSkinPrice> = [steamPrice,bitskinsPrice];

  const tmp = { 
    props:{
      steam:await marketList[0]!(gunName,skinName),
      bitskins:await marketList[1]!(gunName,skinName)
      }
    };
  return tmp;
}


export default function Page(props: {steam:Prices,bitskins:Prices}) {
  const addToWatchlist = api.watchlist.addToUsersWatchlist.useMutation();
  const path = usePathname();
  const {data:session,status} = useSession();
  if (path !== null){
    const [gunName,skinName] = getNamesFormUrl(path) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    let addBtn = null
    if (status == "authenticated"){
      const email = (session.user && session.user.email) ?? "Unknown";
      addBtn = (
        <div>
          <Button onClick = {() => addToWatchlist.mutate({gunName:gunName,skinName:skinName,email:email})}>
            Add to watchlist
          </Button>
        </div>
      )
    }
    return (
    <div className="h-lvh">
      <div className="flex flex-row h-full">
        <div className="flex flex-1 flex-col justify-center">
          <div id ="pic" >
            <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700}/>
          </div>
          {addBtn}
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