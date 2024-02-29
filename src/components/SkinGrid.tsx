import { Grid } from "@mui/material";
import { api } from "~/utils/api";
import GridEntry from "./GridEntry";

export default function SkinGrid(props :{gunName:string}){
    const skins = api.skins.getSkins.useQuery(props.gunName);
    const skinList = skins.data;
      return <Grid container spacing={5} className="m-1">
        {skinList?.map((skin) =>(
            <GridEntry 
                key={skin.NAME.concat(skin.GUN_NAME)} 
                gunName={skin.GUN_NAME} 
                skinName ={skin.NAME} 
                gunPic={"/Skins".concat("/").concat(skin.GUN_NAME).concat("/Factory_New").concat("/").concat(skin.NAME).concat(".png")}
            />
            )
        )}
      </Grid>;
}
