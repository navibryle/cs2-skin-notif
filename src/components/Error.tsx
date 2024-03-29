import { Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
export function CenteredError(props:{className?:string}){
    return (
      <div className={"flex justify-center " + props.className}>
        <SentimentVeryDissatisfiedIcon color="error"/><Typography color="red" variant="h3">Error</Typography>
      </div>
    );
}