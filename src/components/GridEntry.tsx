import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";

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
function Loading(props: {gunName: string,skinName: string, gunPic:string}){
    return (
    <Grid item xs={10} md={2}>
        <Card className="opacity-60 bg-gray-50 hover:scale-125">
            <CardActionArea>
              <CircularProgress className="z-10"/>
              <CardMedia>
                <Image src={props.gunPic} alt={props.gunName.concat(" ").concat(props.skinName)} width={300} height={300}/>
              </CardMedia>
              <CardContent>
                 {props.skinName}
              </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
  )
}

function Loaded(props: {gunName: string,skinName: string, gunPic:string,isRemovable:boolean,id?:string,skinId?:bigint,setShouldLoad?:Dispatch<SetStateAction<boolean>>}){
  let removeButton = null;
  if (props.isRemovable){
    removeButton = <RemoveWatchlist id={props.id!} skinId={props.skinId!} setShoudLoad={props.setShouldLoad!}/>;
  }
  
  const { push } = useRouter();
    return (
    <Grid item xs={10} md={2}>
        <Card className="bg-gray-50 hover:scale-125">
            {removeButton}
            <CardActionArea onClick= {() => push("/gun/".concat(props.gunName).concat("_").concat(props.skinName))}>
              <CardMedia>
                <Image src={props.gunPic} alt={props.gunName.concat(" ").concat(props.skinName)} width={300} height={300}/>
              </CardMedia>
              <CardContent>
                 {props.skinName}
              </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
  )
}


export default function GridEntry(props: {gunName: string,skinName: string, gunPic:string,children?:JSX.Element,shouldLoad:boolean,isRemovable:boolean,skinId?:bigint,id?:string}){
  const [shouldLoad,setShouldLoad] = useState(props.shouldLoad);
  return (
  <>
    {shouldLoad ? 
      <Loaded gunName={props.gunName} skinName={props.skinName} gunPic={props.gunPic} isRemovable={props.isRemovable} setShouldLoad={setShouldLoad} skinId={props.skinId} id={props.id}/>
    : <Loading gunName={props.gunName} skinName={props.skinName} gunPic={props.gunPic}/>}
  </>
  )
}