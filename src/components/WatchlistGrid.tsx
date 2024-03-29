import { Grid } from "@mui/material";
import { useState } from 'react';
import { api } from "~/utils/api";
import { convertToFrontEndForm, getPathToPic, idGen } from "~/utils/util";
import { CenteredError } from "./Error";
import GridEntry from "./GridEntry";
import { CenteredLoading } from "./Loading";



export default function WatchlistGrid(props:{
  id:string
}){
  const res = api.watchlist.getUserWatchlist.useQuery(props.id);
  const [shouldDisable,setShouldDisable] = useState(false);

  if (res.status == "loading"){
    return <CenteredLoading/>
  }else if (res.status == "error"){
    return <CenteredError/>
  }

  const skinList = [];

  for (const i of res.data){
    skinList.push({gunName:i.SKIN.GUN_NAME,skinName:i.SKIN.NAME,id:i.SKIN.ID,price:i.PRICE,tier:i.TIER});
  }
  return (
  <Grid container spacing={5} className="p-10">
    {skinList.map(
      (skin) =>(
          <GridEntry
            key={skin.skinName.concat(skin.gunName).concat(idGen().toString())}
            gunName={convertToFrontEndForm(skin.gunName)}
            skinName={convertToFrontEndForm(skin.skinName)}
            gunPic={getPathToPic(skin.gunName,skin.skinName)}
            link={"/login/watch/".concat(convertToFrontEndForm(skin.gunName)).concat("_")
              .concat(convertToFrontEndForm(skin.skinName)).concat("?skinId=").concat(skin.id.toString()).concat("&userId=").concat(props.id.toString())
              .concat("&tier=").concat(skin.tier)}
            shouldLoad={!shouldDisable}
            setShouldDisable={setShouldDisable}
            isRemovable={true}
            skinId={skin.id}
            id={props.id}
            />
        )
      )
    }
  </Grid>)
}