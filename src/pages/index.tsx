import Head from "next/head";
import TextField from "@mui/material/TextField"
import { IconButton } from "@mui/material";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useState } from "react";

export default function Home() {
  const [searchBarMargin,setSearchBarMargin] = useState({marginTop:"50vh"});
  const searchBtnClick = () => {
    setSearchBarMargin({marginTop:"10vh"});
  }
  return (
    <>
      <Head>
        <title>Cs market notifier</title>
        <meta name="description" content="Notifies users with their selected counter strike market trend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="searchBar" className="flex flex-col" style={searchBarMargin}>
        <div className="text-center">
          <span className="flex justify-center">
            <TextField id="outlined-basic" variant="outlined" label="Search"/>
            <IconButton aria-label = "search" className="align-middle" onClick={searchBtnClick}>
              <ZoomInIcon/>
            </IconButton>
          </span>
        </div>
      </div>
    </>
  );
}

