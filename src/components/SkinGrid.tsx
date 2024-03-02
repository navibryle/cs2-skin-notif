import { Grid } from "@mui/material";
import { api } from "~/utils/api";
import GridEntry from "./GridEntry";

export default function SkinGrid(props :{gunName:string}){
    const skins = api.skins.getSkins.useQuery(props.gunName);
    const skinList = skins.data;
      return <Grid container spacing={5} className="m-1">
        {skinList?.map((skin) =>(
            /*Need to use the GUN_NAME from database here since gun name doesn't always match the case sensitivity of the folder names*/
            <GridEntry 
                key={skin.NAME.concat(skin.GUN_NAME).concat((Math.random()*Math.pow(2,31)).toString())} 
                gunName={skin.GUN_NAME} 
                skinName ={skin.NAME} 
                gunPic={"/Skins".concat("/").concat(skin.GUN_NAME).concat("/Factory_New").concat("/").concat(skin.NAME).concat(".png")}
            />
            )
        )}
      </Grid>;
}
