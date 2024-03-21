import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, CardActionArea, CircularProgress, Grid } from "@mui/material";
import { type Dispatch, type SetStateAction, useState } from 'react';
import { api } from "~/utils/api";
import { convertToFrontEndForm, getPathToPic, idGen } from "~/utils/util";
import GridEntry from "./GridEntry";

const RemoveWatchlist = (props:{
  id:string,
  skinId:bigint,
  setShoudLoad:Dispatch<SetStateAction<boolean>>
}) => {
  const removeWatchlist = api.watchlist.removeWatchlist.useMutation();
  props.setShoudLoad(!removeWatchlist.isLoading);
  return (<CardActionArea onClick = { () => removeWatchlist.mutate({skinId:props.skinId,userId:props.id})}>
    <div className="flex justify-center bg-red-800">
      <DeleteIcon/>
    </div>
  </CardActionArea>);
}


export default function WatchlistGrid(props:{
  id:string
}){
  const res = api.watchlist.getUserWatchlist.useQuery(props.id);
  const [shouldLoad,setShouldLoad] = useState(true);

  if (res.status == "loading"){
    // TODO: add cool loading screen
    return <div>loading</div>;
  }else if (res.status == "error"){
    // TODO: return error page
    return <div>Error</div>;
  }

  const skinList = [];

  for (const i of res.data){
    // TODO: create new grid that fetches a list of guns
    skinList.push({gunName:i.SKIN.GUN_NAME,skinName:i.SKIN.NAME,id:i.SKIN.ID});
  }
  return (
  <Grid container spacing={5} className="m-1">
    {skinList.map(
      (skin) =>(
          <GridEntry
            key={skin.skinName.concat(skin.gunName).concat(idGen().toString())}
            gunName={convertToFrontEndForm(skin.gunName)}
            skinName={convertToFrontEndForm(skin.skinName)}
            gunPic={getPathToPic(skin.gunName,skin.skinName)}
            link={"/login/watch/".concat(skin.gunName).concat("_").concat(skin.skinName)}
            shouldLoad={shouldLoad}
            isRemovable={true}
            skinId={skin.id}
            id={props.id}
            >
            <RemoveWatchlist id={props.id} skinId={skin.id} setShoudLoad={setShouldLoad}/>
          </GridEntry>
        )
      )
    }
  </Grid>)
}