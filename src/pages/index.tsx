import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import { useState } from "react";

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
        <Grid item xs={2}>
          {/* TODO: test this out with a single cs2 item */}
          <Card className="bg-red-100">
            <CardHeader>
              Test
            </CardHeader>
            <CardContent>
                test content
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          hello
        </Grid>
        <Grid item xs={2}>
          hello
        </Grid>
        <Grid item xs={2}>
          hello
        </Grid>
      </Grid>
    </>
  );
}

