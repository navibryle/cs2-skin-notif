import DeleteIcon from '@mui/icons-material/Delete';
import { CardActionArea, Grid } from "@mui/material";
import { api } from "~/utils/api";
import { convertToFrontEndForm, getPathToPic, idGen } from "~/utils/util";
import GridEntry from "./GridEntry";

export default function WatchlistGrid(props:{
  id:string
}){
  const removeWatchlist = api.watchlist.removeWatchlist.useMutation();
  const res = api.watchlist.getUserWatchlist.useQuery(props.id);

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
    skinList.push({gunName:i.SKIN.GUN_NAME,skinName:i.SKIN.NAME,id:i.ID});
  }

  return (
  <Grid container spacing={5} className="m-1">
    {skinList.map(
      (skin) =>(
        <GridEntry
          key={skin.skinName.concat(skin.gunName).concat(idGen().toString())}
          gunName={convertToFrontEndForm(skin.gunName)}
          skinName={convertToFrontEndForm(skin.skinName)}
          gunPic={getPathToPic(skin.gunName,skin.skinName)}>
          <CardActionArea onClick = { () => removeWatchlist.mutate(skin.id)}>
            <div className="flex justify-center bg-red-800">
              <DeleteIcon/>
            </div>
          </CardActionArea>
        </GridEntry>
      )
    )
    }
  </Grid>)
}