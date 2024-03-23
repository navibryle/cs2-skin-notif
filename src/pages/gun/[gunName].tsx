import { Button, CircularProgress } from '@mui/material';
import { type NextPageContext } from 'next';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { bitskinsPrice } from '~/services/bitskinsService';
import { getNamesFormUrl, steamPrice } from '~/services/steamService';
import { api } from '~/utils/api';
import { type GetSkinPrice, type Prices } from '~/utils/types';
import { getPathToPic } from '~/utils/util';
import { marketTiers } from '~/services/constants';


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

function AddBtn(props:{gunName:string,skinName:string,id:string,tier:string}){
  const addToWatchlist = api.watchlist.addToUsersWatchlist.useMutation();
  return (
      <div className="flex justify-center">
          {
            addToWatchlist.status == "idle" && 
            <Button onClick = {() => addToWatchlist.mutate({...props})} >
              Add to watchlist
            </Button>
          }
          {
            addToWatchlist.status == "loading" && 
            <CircularProgress/>
          }
          {
            addToWatchlist.status == "success" &&
            <div>
              {/*TODO: make this text green*/}
              Added to watchlist
            </div>
          }
          {
            addToWatchlist.status == "error" &&
            <div>
              {/*TODO: make this text red*/}
              Could not add to watchlist
            </div>
          }
        
      </div>
  )
}

function AlreadyOnWatchlist(){
  // TODO: make the text pop
  return (
    <div className="flex justify-center">
      Already Added
    </div>
  )
}

function WatchlistOption(props:{gunName:string,skinName:string,id:string,tier:string}){
  const gunOnUserWatchlist = api.watchlist.userHasGunOnWatchlist.useQuery(props)
  if (gunOnUserWatchlist.isLoading){
    return (
    <div>
      <CircularProgress/>
    </div>)
  }
  if (gunOnUserWatchlist.isError){
    return (
      <div>
        {/*TODO: throw cool error component here*/}
        ERROR
      </div>
    )
  }
  return (
      <div>
        {gunOnUserWatchlist.data?.SKIN_ID != undefined ? <AlreadyOnWatchlist/> : <AddBtn {...props} />}
      </div>
  )
}


export default function Page(props: {steam:Prices,bitskins:Prices}) {
  const path = usePathname();
  const {data:session,status} = useSession();
  if (path !== null){
    const [gunName,skinName] = getNamesFormUrl(path) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    return (
    <div className="h-lvh">
      <div className="flex flex-row h-full">
        <div className="flex flex-1 flex-col justify-center">
          <div id ="pic" >
            <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700}/>
          </div>
          {status == "authenticated" && <WatchlistOption skinName={skinName} gunName={gunName} id={session.user.id} tier={marketTiers[0]!}/>}
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