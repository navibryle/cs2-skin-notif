import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import Image from 'next/image';
import example from "public/exampleAk.png";
import { useState } from "react";
import { type StaticImageData } from "next/image"

function CsSkin(props: {gunName: string,skinName: string, gunPic:StaticImageData}){
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

export default function Home() {
  const isSearchBarOnTop = false;
  const [searchBarTopMargin,setSearchBarTopMargin] = useState("50vh");
  const searchBtnClick = () => {
    if (!isSearchBarOnTop){
      setSearchBarTopMargin("10vh");
    }
  }
  return (
    <>
      <Head>
        <title>Cs market notifier</title>
        <meta name="description" content="Notifies users with their selected counter strike market trend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="searchBar" className="flex flex-col" style={{marginTop:searchBarTopMargin,marginBottom:"10vh"}}>
        <div className="text-center">
          <span className="flex justify-center">
            <TextField id="outlined-basic" variant="outlined" label="Search"/>
            <IconButton aria-label = "search" className="align-middle" onClick={searchBtnClick}>
              <ZoomInIcon/>
            </IconButton>
          </span>
        </div>
      </div>
      <Grid container spacing={5} className="m-1">
        <CsSkin gunName="ex" skinName ="ex" gunPic={example}/>
      </Grid>
    </>
  );
}

