import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import CenteredError from './Error';

const RemoveWatchlist = (props:{
    id:string,
    skinId:bigint,
    setShoudLoad:Dispatch<SetStateAction<boolean>>,
    setIsDeleted:Dispatch<SetStateAction<boolean>>
  }) => {
  const removeWatchlist = api.watchlist.removeWatchlist.useMutation();
  const removeCallback = () => {
    removeWatchlist.mutate({skinId:props.skinId,userId:props.id})
  }
  if (removeWatchlist.isSuccess){
    props.setIsDeleted(true);
  }else if (removeWatchlist.isError){
    return <CenteredError/>
  }else if (removeWatchlist.isIdle){
    return (<CardActionArea onClick = {removeCallback}>
      <div className="flex justify-center bg-red-800">
        <DeleteIcon/>
      </div>
    </CardActionArea>);
  }else if (removeWatchlist.isLoading){
    props.setShoudLoad(true)
  }
}

const Loading = (props:{
    gunName: string,skinName: string, gunPic:string
  }) => {
  return (
    <Grid item xs={10} md={2}>
        <Card className="opacity-60 bg-gray-50 hover:scale-125">
            <CardActionArea>
              <CircularProgress className="z-10"/>
              <CardMedia>
                <Image src={props.gunPic} alt={props.gunName.concat(" ").concat(props.skinName)} width={300} height={300}/>
              </CardMedia>
              <CardContent>
                 {props.skinName} </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
  )
}

const Loaded = (props:{
    gunName: string,skinName: string, gunPic:string, link:string, isRemovable:boolean,
    id?:string,skinId?:bigint,setShouldLoad?:Dispatch<SetStateAction<boolean>>,
    setShouldDisable:Dispatch<SetStateAction<boolean>>,setIsDeleted:Dispatch<SetStateAction<boolean>>
  }) => {
  const { push } = useRouter();
  const pageSwitch = async () =>{
    props.setShouldDisable(true);
    await push(props.link);

  }
    return (
    <Grid item xs={10} md={2}>
        <Card className="bg-gray-50 hover:scale-125">
            {props.isRemovable && <RemoveWatchlist id={props.id!} skinId={props.skinId!} setShoudLoad={props.setShouldLoad!} setIsDeleted={props.setIsDeleted}/>}
            <CardActionArea onClick= {pageSwitch}>
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


export default function GridEntry(props:{
    gunName: string,skinName: string, gunPic:string,
    link:string,shouldLoad:boolean,isRemovable:boolean,
    skinId?:bigint,id?:string,setShouldDisable:Dispatch<SetStateAction<boolean>>}
  ){
  // replace the content with an empty span if it has been deleted in the database
  const [shouldLoad,setShouldLoad] = useState(props.shouldLoad);
  const [isDeleted,setIsDeleted] = useState(false)
  let content = shouldLoad ? 
      <Loaded gunName={props.gunName} skinName={props.skinName} gunPic={props.gunPic} 
        link={props.link} isRemovable={props.isRemovable} setShouldLoad={setShouldLoad} 
        skinId={props.skinId} id={props.id} setShouldDisable={props.setShouldDisable} setIsDeleted={setIsDeleted}
      />
      :<Loading gunName={props.gunName} skinName={props.skinName} gunPic={props.gunPic}/>
  if (isDeleted){
    content = <span></span>
  }
  return (
  <>
    {content}
  </>
  )
}