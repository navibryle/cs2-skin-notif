import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GridEntry(props: {gunName: string,skinName: string, gunPic:string}){
  const { push } = useRouter();
  console.warn("DEBUGPRINT[3]: GridEntry.tsx:7 (after const  push  = useRouter();)")
  console.log(props.skinName);
  console.warn("DEBUGPRINT[4]: GridEntry.tsx:8 (after console.warn(DEBUGPRINT[3]: GridEntry.ts…)")
  return (
  <>
    <Grid item xs={10} md={2} >
    <Card className="bg-gray-50 hover:scale-125">
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
  </>
  )
}
