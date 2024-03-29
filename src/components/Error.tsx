import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Typography } from "@mui/material";
export default function CenteredError(props:{className?:string,children?:React.ReactNode}){
  const DefaultMessage = () => {
    return (
     <span><SentimentVeryDissatisfiedIcon color="error"/><Typography color="red" variant="h3">Error</Typography></span>
    )
  }
  return (
    <div className={"flex justify-center " + props.className}>
      {props.children ?
        props.children : <DefaultMessage/>
      }
    </div>
  );
}