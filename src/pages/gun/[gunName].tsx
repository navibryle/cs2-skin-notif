import { Button, CircularProgress, Typography } from '@mui/material';
import { type NextPageContext } from 'next';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { bitskinsPrice } from '~/services/bitskinsService';
import { getNamesFormUrl, steamPrice } from '~/services/steamService';
import { api } from '~/utils/api';
import { type GetSkinPrice, type Prices } from '~/utils/types';
import { convertToFrontEndForm, getPathToPic } from '~/utils/util';
import { marketTiers } from '~/services/constants';
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied';
import { CenteredLoading } from '~/components/Loading';
import { CenteredError } from '~/components/Error';


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
            <Button color="inherit" onClick = {() => addToWatchlist.mutate({...props})} className="bg-sky-700">
              Add to watchlist
            </Button>
          }
          {
            addToWatchlist.status == "loading" && 
            <CircularProgress/>
          }
          {
            addToWatchlist.status == "success" &&
            <Typography color="green">
              Successfully added to your watchlist!
            </Typography>
          }
          {
            addToWatchlist.status == "error" &&
            <Typography>
              <SentimentVeryDissatisfied color="error"/> Could not add to watchlist
            </Typography>
          }
        
      </div>
  )
}

function AlreadyOnWatchlist(){
  return (
    <Typography color="blue" className="flex justify-center">
      This item is in your watchlist
    </Typography>
  )
}

function WatchlistOption(props:{gunName:string,skinName:string,id:string,tier:string}){
  const gunOnUserWatchlist = api.watchlist.userHasGunOnWatchlist.useQuery(props)
  if (gunOnUserWatchlist.isLoading){
    return (
    <CenteredLoading/>
    )
  }
  if (gunOnUserWatchlist.isError){
    return (
      <CenteredError/>
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
      <div className="flex flex-col h-full">
        <Typography className="text-center" variant="h5">{convertToFrontEndForm(gunName) + " "+convertToFrontEndForm(skinName)}</Typography>
        <div className="flex flex-1 flex-row justify-center">
          <div id ="pic" >
            <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700}/>
          </div>
        </div>
        {status == "authenticated" && <WatchlistOption skinName={skinName} gunName={gunName} id={session.user.id} tier={marketTiers[0]!}/>}
        <div className="flex sm:flex-row flex-col">
         <div className="flex-1 flex flex-col">
            <div className="text-center">
              <Typography variant="h5">Steam Prices</Typography>
            </div>
            <div className="text-center">
              Factory New: {props.steam?.fNew}<br/>
              Minimal Wear: {props.steam?.minWear}<br/>
              Field-Tested: {props.steam?.fTesteted}<br/>
              Well-Worn: {props.steam?.wellWorn}<br/>
              Battle-Scarred: {props.steam?.bScarred}
            </div>
         </div>
         <div className="flex-1 flex flex-col justify-center">
            <div className="text-center">
              <Typography variant="h5">Bitskins prices</Typography>
            </div>
            <div className="text-center">
              Factory New: {props.bitskins?.fNew}<br/>
              Minimal Wear: {props.bitskins?.minWear}<br/>
              Field-Tested: {props.bitskins?.fTesteted}<br/>
              Well-Worn: {props.bitskins?.wellWorn}<br/>
              Battle-Scarred: {props.bitskins?.bScarred}
            </div>
         </div>
        </div>
      </div>
    </div>
    )  
  }else{
    return <div>error</div>;
  }
}