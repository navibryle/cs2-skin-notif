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
    <div className="flex w-full justify-center h-screen">
      <div>
        
      </div>
      <h1> Watchlist: </h1>
      <WatchlistGrid id = {session.user.id}/>
    </div>
  );
}