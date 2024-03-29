import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Autocomplete, IconButton, TextField, Tooltip } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import CenteredError from './Error';
import { CenteredLoading } from './Loading';

const afterSearchHeight = "10vh";
const beforeSearchHeight = "50vh";

const updateSearchBar = (queryRes :boolean,height:string,setSearchBarTopMargin:Dispatch<SetStateAction<string>>) => {
  if (queryRes && height !== afterSearchHeight){
    setSearchBarTopMargin(afterSearchHeight);
  }else if (!queryRes && height !== beforeSearchHeight){
    setSearchBarTopMargin(beforeSearchHeight);
  }
}

export default function SearchBar(props:{
    hasQueryResState:{hasQueryRes:boolean,setHasQueryRes:Dispatch<SetStateAction<boolean>>}
    setInput:Dispatch<SetStateAction<string>>
  }){
  const gunData = api.steam.getAllGunNames.useQuery();
  const [searchBarTopMargin,setSearchBarTopMargin] = useState(beforeSearchHeight);

  if (gunData.isLoading){
    return <CenteredLoading/>
  }else if (gunData.isSuccess || gunData.isFetched){
    const gunNames : Array<{GUN_NAME:string}> | undefined = gunData.data;
    const gunList:Array<{label:string,key:string}>= [];
    if (gunNames === undefined){
      return <CenteredError/>
    }
    for (const gun of gunNames){
      gunList.push({label:gun.GUN_NAME.replace("_"," "),key:(Math.random()*Math.pow(2,31)).toString()});
    }
    updateSearchBar(props?.hasQueryResState.hasQueryRes,searchBarTopMargin,setSearchBarTopMargin); 
    const searchBtnClick = () => {
      updateSearchBar(props?.hasQueryResState.hasQueryRes,searchBarTopMargin,setSearchBarTopMargin); 
    }  
    return (
      <div id="searchBar" className="flex flex-col" style={{marginTop:searchBarTopMargin,marginBottom:afterSearchHeight}}>
        <div className="text-center">
          <span className="flex justify-center">
          <Autocomplete 
          disablePortal
          options={gunList}
          onInputChange={(event, value) => props.setInput(value)/**event is not used here but not having it here throws an error**/}
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