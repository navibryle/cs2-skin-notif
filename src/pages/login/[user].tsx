import { Typography } from "@mui/material";
import { type NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import WatchlistGrid from "~/components/WatchlistGrid";


export async function getServerSideProps(context:NextPageContext){
  const session = await getSession(context)

  if (!session){
    return {
      redirect:{
        destination:"/",
        pemanent:false
      }
    }
  }
  return {props:{}}
}

export default function Page(){
  const {data:session} = useSession()
  if (!session){
    return <div> Error</div>
  }
  return (
    <div className="flex w-full justify-center flex-col mt-2">
      <div className="flex flex-row justify-center">
        <div className="justify-center">
          <Typography variant="h5"> Watchlist </Typography>
        </div>
      </div>

      <WatchlistGrid id = {session.user.id}/>
    </div>
  );
}