import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Autocomplete, IconButton, TextField, Tooltip, type AutocompleteInputChangeReason } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { api } from "~/utils/api";

export default function SearchBar(props:{
    onSearchInput:(event: SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => void
  }){

  const gunData = api.skins.getAllGunNames.useQuery();
  const [searchBarTopMargin,setSearchBarTopMargin] = useState("50vh");

  if (gunData.status === "loading"){
    return (<div>Loading</div>)
  }else if (gunData.status === "success"){
    const isSearchBarOnTop = false;

    const gunNames : Array<{GUN_NAME:string}> | undefined = gunData.data;
    const gunList:Array<{label:string,key:string}>= [];
    if (gunNames === undefined){
      throw Error("wtf");
    }
    for (const gun of gunNames){
      gunList.push({label:gun.GUN_NAME.replace("_"," "),key:(Math.random()*Math.pow(2,31)).toString()});
    }
    const searchBtnClick = async () => {
      if (!isSearchBarOnTop){
        setSearchBarTopMargin("10vh");
      }
    }

    return (<div id="searchBar" className="flex flex-col" style={{marginTop:searchBarTopMargin,marginBottom:"10vh"}}>
        <div className="text-center">
          <span className="flex justify-center">
            <Autocomplete 
            disablePortal
            id="combo"
            options={gunList}
            onInputChange={props.onSearchInput}
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
      </div>);
  }else{
    return (<div>
    <div>
      Error
    </div>
    <div>
      {gunData.error.message}
    </div>
    </div>)
  }
}
