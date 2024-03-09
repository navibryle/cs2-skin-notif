import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Autocomplete, IconButton, TextField, Tooltip, type AutocompleteInputChangeReason } from "@mui/material";
import { useState, type SyntheticEvent, type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";

function updateSearchBar(queryRes :boolean,height:string,setSearchBarTopMargin:Dispatch<SetStateAction<string>>){
    if (queryRes && height !== "10vh"){
        setSearchBarTopMargin("10vh");
    }else if (!queryRes && height !== "50vh"){
        setSearchBarTopMargin("50vh");
    }
}

export default function SearchBar(props:{
    hasQueryResState:{hasQueryRes:boolean,setHasQueryRes:Dispatch<SetStateAction<boolean>>}
    setInput:Dispatch<SetStateAction<string>>
  }){

  const gunData = api.steam.getAllGunNames.useQuery();
  const [searchBarTopMargin,setSearchBarTopMargin] = useState("50vh");

  const onSearchInput = (event: SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => {
    // reason and event are unused, they are only here to adhere to a type contract
    props.setInput(value);
  }
  if (gunData.status === "loading"){
    return (<div>Loading</div>)
  }else if (gunData.status === "success"){

    const gunNames : Array<{GUN_NAME:string}> | undefined = gunData.data;
    const gunList:Array<{label:string,key:string}>= [];
    if (gunNames === undefined){
      throw Error("wtf");
    }
    for (const gun of gunNames){
      gunList.push({label:gun.GUN_NAME.replace("_"," "),key:(Math.random()*Math.pow(2,31)).toString()});
    }

    updateSearchBar(props?.hasQueryResState.hasQueryRes,searchBarTopMargin,setSearchBarTopMargin); 

    const searchBtnClick = () => {
      updateSearchBar(props?.hasQueryResState.hasQueryRes,searchBarTopMargin,setSearchBarTopMargin); 
    }

    return (
      <div id="searchBar" className="flex flex-col" style={{marginTop:searchBarTopMargin,marginBottom:"10vh"}}>
        <div className="text-center">
          <span className="flex justify-center">
            <Autocomplete 
            disablePortal
            options={gunList}
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
      </div>);
  }else{
    return (
      <div>
        <div>
          Error
        </div>
        <div>
          {gunData.error.message}
        </div>
      </div>)
  }
}
