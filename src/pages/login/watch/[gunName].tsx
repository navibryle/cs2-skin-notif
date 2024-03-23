import { usePathname } from "next/navigation";
import { Button, CircularProgress, FormControlLabel, RadioGroup, TextField, Radio } from "@mui/material";
import { type NextPageContext } from "next";
import Image from "next/image";
import { useState, type Dispatch, type SetStateAction } from "react";
import { db } from "~/server/db";
import { marketTiers } from "~/services/constants";
import { getNamesFormUrl } from "~/services/steamService";
import { api } from "~/utils/api";
import { getPathToPic, idGen } from "~/utils/util";

export async function getServerSideProps(context:NextPageContext){
  console.log(context.query);
  const skinId = context.query.skinId! as string;
  const userId = context.query.userId! as string;
  const tier = context.query.tier! as string;
  const item = await db.wATCHLIST.findUnique({
    select:{
      PRICE:true
    },
    where:{
      SKIN_ID_USER_ID: {SKIN_ID:BigInt(skinId),USER_ID:userId}
    }
  })
  return {props:{price:item?.PRICE,skinId:skinId,userId:userId,tier:tier}}
}

function isDigit(a:string){
  const digits = ["1","2","3","4","5","6","7","8","9","0"]
  return a in digits;
}

function WatchlistInputForm(props: {skinId:bigint,userId:string,price:string,setPrice:Dispatch<SetStateAction<string>>}){
  const updatePrice = api.watchlist.updateWatchList.useMutation();
  const [isError,setIsError] = useState(false);
  const [tmpPrice,setTmpPrice] = useState("");
  const [selectedTier,setTier] = useState(marketTiers[0]);
  const TierForm = () => {
    return (
      <RadioGroup 
        value={selectedTier}
        onChange={(e) => setTier(e.target.value)}
      >
        {
          marketTiers.map((tier) => (
            <FormControlLabel 
              value={tier}
              control={<Radio/>}
              key={idGen().toString()}
              label={tier} 
            />
          ))
        }
      </RadioGroup>
    )
  }
  const Btn = () => {
    if (updatePrice.isError){
      // TODO: display good error
      return <div> Error</div>;
    }else if (updatePrice.isLoading){
      return <CircularProgress/>
    }else if(updatePrice.isIdle){
      return <Button color="inherit" className="bg-sky-700 mt-4" onClick={() => 
        tmpPrice && selectedTier && updatePrice.mutate({skinId:props.skinId,userId:props.userId,price:tmpPrice,tier:selectedTier})
      }>Update</Button>;
    }else if (updatePrice.isSuccess){
        props.setPrice(tmpPrice);
    }
  }
  const InputForm = () => {
    return (
    <div>
      <Btn/>
      <TierForm/>
    </div>
    )
  }
  return (
    <>
      <TextField label="Watchlist price" onChange={(e) => {
        const inp = e.target.value;
        for (const i of inp){
          if (!isDigit(i) && i !== "."){
            setIsError(true);
            return;
          }
        }
        setIsError(false);
        setTmpPrice(inp);
      }}/>
      {isError && <div className="text-xs text-red-500" >Incorrect price format, please enter a decimal number</div>}
      {!isError && <InputForm/>}
    </>
  )
}

function PriceDisplay(props:{price:string,skinId:bigint,userId:string,tier:string,setPrice:Dispatch<SetStateAction<string>>}){
  const updatePrice = api.watchlist.updateWatchList.useMutation();
  const Btn = () => {
    if (updatePrice.isError){
      // TODO: display good error
      return <div> Error</div>;
    }else if (updatePrice.isLoading){
      return <CircularProgress/>
    }else if(updatePrice.isIdle){
      return <Button className="bg-sky-700" onClick={() => updatePrice.mutate({skinId:props.skinId,userId:props.userId,price:null,tier:props.tier})}>Delete</Button>;
    }else if (updatePrice.isSuccess){
        props.setPrice("");
    }
  }
  // TODO: pretify this
  return (
    <div>
      {props.price}<br/>
      {props.tier}<br/>
      <Btn/>
    </div>
  )
}

export default function Page(props:{price:string,skinId:string,userId:string,tier:string}){
  const [price,setPrice] = useState(props.price);
  const path = usePathname();
  const skinId = BigInt(props.skinId);
  if (path !== null){
    const [gunName,skinName] = getNamesFormUrl(path) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    return (
      <div className="flex">
        <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700} className="flex-grow"/>
        <div className="flex-grow">
          <div className="flex flex-col mt-10 mr-10">
            {
              price ? 
              <PriceDisplay skinId={skinId} price={price} userId={props.userId} setPrice={setPrice} tier={props.tier}/>: 
              <WatchlistInputForm skinId={skinId} price={price} userId={props.userId} setPrice={setPrice}/>
            }
          </div>
        </div>
      </div>
    )
  }else{
    <div>
      error
    </div>
  }
}