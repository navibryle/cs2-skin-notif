import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';

export default function GridEntry(props: {gunName: string,skinName: string, gunPic:string,children?:JSX.Element}){
  const { push } = useRouter();
  return (
  <>
    <Grid item xs={10} md={2} >
    <Card className="bg-gray-50 hover:scale-125">
      {props.children}
      <CardActionArea onClick= {() => push("/gun/".concat(props.gunName).concat("_").concat(props.skinName))}>
        <CardMedia>
          <Image src={props.gunPic} alt={props.gunName.concat(" ").concat(props.skinName)} width={300} height={300}/>
        </CardMedia>
      </CardActionArea>
      <CardContent>
         {props.skinName}
      </CardContent>
    </Card>
    </Grid>
  </>
  )
}