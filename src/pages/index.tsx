'use client';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import { useState } from "react";
import SkinGrid from '~/components/SkinGrid';
import { api } from '~/utils/api';

export default function Home() {
  const isSearchBarOnTop = false;
  const [searchBarTopMargin,setSearchBarTopMargin] = useState("50vh");
  const [input,setInput] = useState("");
  const searchBtnClick = async () => {
    if (!isSearchBarOnTop){
      setSearchBarTopMargin("10vh");
    }
  }
  const onSearchInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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
            <TextField id="outlined-basic" variant="outlined" label="Search" onInput={onSearchInput}/>
            <IconButton aria-label = "search" className="align-middle" onClick={searchBtnClick}>
              <ZoomInIcon/>
            </IconButton>
          </span>
        </div>
      </div>
      <SkinGrid gunName={input}/>
    </>
  );
}

