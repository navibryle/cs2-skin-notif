'use client';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Autocomplete, IconButton, Tooltip, type AutocompleteInputChangeReason } from "@mui/material";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import { useState, type SyntheticEvent } from "react";
import SkinGrid from '~/components/SkinGrid';
import { api } from '~/utils/api';

export default function Home() {
  // use states
  const [searchBarTopMargin,setSearchBarTopMargin] = useState("50vh");
  const [query,setInput] = useState("");

  const isSearchBarOnTop = false;

  const gunNames : Array<{GUN_NAME:string}> | undefined = api.skins.getAllGunNames.useQuery().data;
  if (gunNames === undefined){
    throw new Error("could not find any guns");
  }
  const test = [
    {label: "test"}
  ]
  const searchBtnClick = async () => {
    if (!isSearchBarOnTop){
      setSearchBarTopMargin("10vh");
    }
  }
  const onSearchInput = (event: SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => {
    setInput(value);
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
            <Autocomplete 
            disablePortal
            id="combo"
            options={test}
            onInputChange={onSearchInput}
            sx={{width:300}}
            renderInput={(params) => <TextField {...params}/>}
            />
            <Tooltip title="Search">
              <IconButton aria-label = "search" className="align-middle" onClick={searchBtnClick}>
                <ZoomInIcon/>
              </IconButton>
            </Tooltip>
          </span>
        </div>
      </div>
      <SkinGrid gunName={query}/>
    </>
  );
}

