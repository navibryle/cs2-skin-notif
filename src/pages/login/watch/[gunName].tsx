import { usePathname } from "next/navigation";

import Image from "next/image";
import { getNamesFormUrl } from "~/services/steamService";
import { getPathToPic } from "~/utils/util";
import { TextField } from "@mui/material";

export async function getServerSideProps(context:NextPageContext){
  
}

export default function Page(){
  const path = usePathname();
  if (path !== null){
    const [gunName,skinName] = getNamesFormUrl(path) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    return (
      <div className="flex">
        <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700} className="flex-grow"/>
        <div className="flex-grow">
          <div className="flex flex-col mt-10 mr-10">
            <TextField label="Watchlist price"/>
          </div>
        </div>
      </div>
    )
  }else{
    <div>
      error
    </div>
  }
}