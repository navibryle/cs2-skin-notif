import { Button, TextField } from "@mui/material";
import { api } from "~/utils/api";

export default function Page(){
  return (
    <div className="flex w-full justify-center h-screen">
      <div className="flex flex-col w-2/5 justify-center">
        <TextField variant="standard" label="Username"/>
        <TextField variant="standard" label="Password" className="mt-2"/>
        <div className="flex mt-2 justify-end">
          <Button variant="contained" color="success" className="bg-sky-700">Login</Button>
        </div>
      </div>
    </div>
  );
}
