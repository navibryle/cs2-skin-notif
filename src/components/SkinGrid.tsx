import { Grid } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import { convertToFrontEndForm, getPathToPic, idGen } from "~/utils/util";
import GridEntry from "./GridEntry";
import { useState } from "react";

export default function SkinGrid(props :{
    hasQueryResState:{hasQueryRes:boolean,setHasQueryRes:Dispatch<SetStateAction<boolean>>}
    setHasQueryRes:Dispatch<SetStateAction<boolean>>,
    gunName:string
  }){

  const [shouldDisable,setShouldDisable] = useState(false);
  const skins = api.steam.getSkins.useQuery(props.gunName.replace(" ","_"));

  if (skins.isLoading){
    return <div>Loading</div>
  }else if (skins.isError){
    return <div>
      Error: {skins.error.message}
    </div>
  } 

  const skinList = skins.data;
  props.hasQueryResState.setHasQueryRes(skinList.length > 0);
  return (<Grid container spacing={5} className="p-10">
    {skinList?.map((skin) =>(
      /*Need to use the GUN_NAME from database here since gun name doesn't always match the case sensitivity of the folder names*/
      <GridEntry 
        key={skin.NAME.concat(skin.GUN_NAME).concat(idGen().toString())} 
        gunName={convertToFrontEndForm(skin.GUN_NAME)} 
        skinName ={convertToFrontEndForm(skin.NAME)} 
        link={"/gun/".concat(convertToFrontEndForm(skin.GUN_NAME)).concat("_").concat(convertToFrontEndForm(skin.NAME))}
        gunPic={getPathToPic(skin.GUN_NAME,skin.NAME)}
        shouldLoad={!shouldDisable}
        isRemovable={false}
        setShouldDisable={setShouldDisable}
      />
      )
    )}
    </Grid>);
}