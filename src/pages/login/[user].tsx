import { useSession } from "next-auth/react";
import WatchlistGrid from "~/components/WatchlistGrid";

export default function Page(){
  const {data:session,status} = useSession();
  if (status == "loading"){
    // TODO: add cool loading screen
    return <div>loading</div>
  }else if (status == "unauthenticated"){
    // TODO: add cool unauthenticated screen
    return <div>unauthenticated</div>
  }
  if (!session?.user?.id){
      // TODO: return a cool user not found page
      return <div>User not found</div>;
  }
  return (
    <div className="flex w-full justify-center h-screen">
      <h1> Watchlist: </h1>
      <WatchlistGrid id = {session.user.id}/>
    </div>
  );
}