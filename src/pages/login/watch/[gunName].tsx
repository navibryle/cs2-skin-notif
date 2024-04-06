import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { type NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { CenteredLoading } from "~/components/Loading";
import { db } from "~/server/db";
import { marketTiers } from "~/services/constants";
import { getNamesFromUrl } from '~/utils/util';
import { api } from "~/utils/api";
import { convertToFrontEndForm, getPathToPic, idGen } from "~/utils/util";
import CenteredError from "~/components/Error";

enum Mode{
  View,
  Create,
  Edit
}

type DbData = {
  dbPrice:string,
  dbTier:string,
}

export async function getServerSideProps(context:NextPageContext){
  const session = await getSession(context)
  if (!session){
    return {
      redirect:{
        destination:"/",
        permanent:false
      }
    }
  }
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
  const price = !item ? null : item.PRICE; // 'undenfined' is not serializable which causes this page to crash. Ensure that it is always serializable
  return {props:{dbPrice:price,skinId:skinId,userId:userId,dbTier:tier}}
}

const isDigit = (a:string) => {
  const digits = ["1","2","3","4","5","6","7","8","9","0"]
  return a in digits;
}

const WatchlistInputForm = (props: {skinId:bigint,userId:string,dbData?:DbData,setDbData:Dispatch<SetStateAction<DbData>>,setMode:Dispatch<SetStateAction<Mode>>}) => {
  const updatePrice = api.watchlist.updateWatchList.useMutation();
  const [isError,setIsError] = useState(false);
  const [price,setPrice] = useState(props.dbData?.dbPrice ?? ""); // this represents the price in the form, props.price is the price in the database
  const [selectedTier,setTier] = useState(props.dbData?.dbTier ?? marketTiers[0]); // this represents the tier in the form, props.tier is the tier in the database
  const TierForm = () => {
    return (
      <RadioGroup 
        value={selectedTier}
        onChange={(e) => setTier(e.target.value)}
        className="m-10"
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
      return <CenteredError className="mt-3"/>
    }else if (updatePrice.isLoading){
      return <CenteredLoading className="mt-3"/>
    }else if(updatePrice.isIdle){
      return <Button color="inherit" className="bg-sky-700 mt-4" onClick={() => 
        price && selectedTier && updatePrice.mutate({skinId:props.skinId,userId:props.userId,price:price,tier:selectedTier,lastNotif:null})
      }>Finish</Button>;
    }else if (updatePrice.isSuccess){
        props.setMode(Mode.View);
        props.setDbData({dbPrice:price,dbTier:selectedTier!});
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
      <div>
        <TextField label="Watchlist price" className="w-3/4 sm:w-full" value={price} onChange={(e) => {
          const inp = e.target.value;
          for (const i of inp){
            if (!isDigit(i) && i !== "."){
              setIsError(true);
              return;
            }
          }
          setIsError(false);
          setPrice(inp);
        }}/>
      </div>
      {isError && <div className="text-xs text-red-500" >Incorrect price format, please enter a decimal number</div>}
      {!isError && <InputForm/>}
    </>
  )
}

const PriceDisplay = (props:{dbData:DbData,setMode:Dispatch<SetStateAction<Mode>>}) => {
  return (
    <div>
      Watchlist Price: {props.dbData.dbPrice}<br/>
      Tier: {props.dbData.dbTier}<br/>
      <Button color="inherit" className="bg-sky-700" onClick={() => props.setMode(Mode.Edit)}>Update</Button>
    </div>
  )
}

export default function Page(props:{dbPrice:string,skinId:string,userId:string,dbTier:string}){
  console.warn("DEBUGPRINT[4]: [gunName].tsx:137 (after export default function Page(props:dbPri…)")
  const [mode,setMode] = useState(props.dbTier && props.dbPrice ? Mode.View : Mode.Create);
  const [dbData,setDbData]  = useState({dbPrice: props.dbPrice,dbTier: props.dbTier} as DbData)
  const path = usePathname();
  const skinId = BigInt(props.skinId);
  console.warn("DEBUGPRINT[5]: [gunName].tsx:142 (after const skinId = BigInt(props.skinId);)")
  const Form = () => {
   switch(mode){
    case Mode.View:{
        return <PriceDisplay dbData={dbData} setMode={setMode}/>
    }case Mode.Create:{
        return <WatchlistInputForm skinId={skinId} userId={props.userId} setDbData={setDbData} setMode={setMode}/>
    } case Mode.Edit:{
        return <WatchlistInputForm skinId={skinId} userId={props.userId} dbData={dbData} setDbData={setDbData} setMode={setMode}/>
    }
   }
  }

  console.warn("DEBUGPRINT[6]: [gunName].tsx:155 (after return <WatchlistInputForm skinId=skinId…)")
  if (path !== null){
    console.warn("DEBUGPRINT[7]: [gunName].tsx:157 (after if (path !== null))")
    const [gunName,skinName] = getNamesFromUrl(path) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    console.warn("DEBUGPRINT[8]: [gunName].tsx:159 (after const [gunName,skinName] = getNamesFromU…)")
    return (
      <div className="flex text-center flex-col sm:flex-row">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <Typography variant="h5">{convertToFrontEndForm(gunName) + " "+convertToFrontEndForm(skinName)}</Typography>
          </div>
          <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700} className="flex-grow"/>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col mt-10 mr-10">
          <Form/>
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