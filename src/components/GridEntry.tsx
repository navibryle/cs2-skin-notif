import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@mui/material";
import Image from "next/image";

export default function GridEntry(props: {gunName: string,skinName: string, gunPic:string}){
  return (
    <>
      <Grid item xs={10} md={2} >
        <Card className="bg-gray-50 hover:scale-125">
          <CardActionArea>
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
