import { Button, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { type NextPageContext } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  return {props:{dbPrice:item?.PRICE,skinId:skinId,userId:userId,dbTier:tier}}
}

function isDigit(a:string){
  const digits = ["1","2","3","4","5","6","7","8","9","0"]
  return a in digits;
}

function WatchlistInputForm(props: {skinId:bigint,userId:string,dbData?:DbData,setDbData:Dispatch<SetStateAction<DbData>>,setMode:Dispatch<SetStateAction<Mode>>}){
  const updatePrice = api.watchlist.updateWatchList.useMutation();
  const [isError,setIsError] = useState(false);
  const [price,setPrice] = useState(props.dbData?.dbPrice ?? ""); // this represents the price in the form, props.price is the price in the database
  const [selectedTier,setTier] = useState(props.dbData?.dbTier ?? marketTiers[0]); // this represents the tier in the form, props.tier is the tier in the database
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
        price && selectedTier && updatePrice.mutate({skinId:props.skinId,userId:props.userId,price:price,tier:selectedTier})
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
      <TextField label="Watchlist price" value={price} onChange={(e) => {
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
      {isError && <div className="text-xs text-red-500" >Incorrect price format, please enter a decimal number</div>}
      {!isError && <InputForm/>}
    </>
  )
}

function PriceDisplay(props:{dbData:DbData,setMode:Dispatch<SetStateAction<Mode>>}){
  // TODO: pretify this
  return (
    <div>
      {props.dbData.dbPrice}<br/>
      {props.dbData.dbTier}<br/>
      <Button className="bg-sky-700" onClick={() => props.setMode(Mode.Edit)}>Update</Button>
    </div>
  )
}

enum Mode{
  View,
  Create,
  Edit
}

type DbData = {
  dbPrice:string,
  dbTier:string,
}


export default function Page(props:{dbPrice:string,skinId:string,userId:string,dbTier:string}){
  const [mode,setMode] = useState(props.dbTier && props.dbPrice ? Mode.View : Mode.Create);
  const [dbData,setDbData]  = useState({dbPrice: props.dbPrice,dbTier: props.dbTier} as DbData)
  const path = usePathname();
  const skinId = BigInt(props.skinId);
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
  if (path !== null){
    const [gunName,skinName] = getNamesFormUrl(path) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    return (
      <div className="flex">
        <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700} className="flex-grow"/>
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