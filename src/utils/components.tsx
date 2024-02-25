import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@mui/material";
import Image, { type StaticImageData } from 'next/image';

export default function TestCs(props: {gunName: string,skinName: string, gunPic:StaticImageData}){
  return (
    <>
      <Grid item xs={10} md={2} >
        <Card className="bg-gray-50 hover:scale-125">
          <CardActionArea>
            <CardContent>
                 {props.gunName}
            </CardContent>
            <CardMedia>
                <Image src={props.gunPic} alt={props.gunName.concat(" ").concat(props.skinName)}/>
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
