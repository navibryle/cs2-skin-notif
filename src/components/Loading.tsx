import { CircularProgress } from "@mui/material";
export function CenteredLoading(props:{className?:string}){
    return (
      <div className={"flex justify-center "+props.className}>
        <CircularProgress/>
      </div>
    );
}