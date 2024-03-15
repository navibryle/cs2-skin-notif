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
  props.setShoudLoad(removeWatchlist.isLoading);
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
  const [shouldLoad,setShouldLoad] = useState(false);

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
  console.warn("DEBUGPRINT[1]: WatchlistGrid.tsx:42 (after skinList.push(gunName:i.SKIN.GUN_NAME,sk…)")
  console.log(shouldLoad);
  console.log(skinList);
  console.warn("DEBUGPRINT[2]: WatchlistGrid.tsx:44 (after console.log(shouldLoad);)")
  return (
  <Grid container spacing={5} className="m-1">
    {skinList.map(
      (skin) =>(
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          key={skin.skinName.concat(skin.gunName).concat(idGen().toString())}
          open={shouldLoad}
        >
          <GridEntry
            gunName={convertToFrontEndForm(skin.gunName)}
            skinName={convertToFrontEndForm(skin.skinName)}
            gunPic={getPathToPic(skin.gunName,skin.skinName)}>
            <RemoveWatchlist id={props.id} skinId={skin.id} setShoudLoad={setShouldLoad}/>
          </GridEntry>
          <CircularProgress color="inherit" />
        </Backdrop>
      )
    )
    }
  </Grid>)
}