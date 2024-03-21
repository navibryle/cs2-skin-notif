import { usePathname } from "next/navigation";
import { getNamesFormUrl } from "~/services/steamService";

export default function Page(){
  const path = usePathname();
  if (path !== null){
    const [gunName,skinName] = getNamesFormUrl(path) as [string,string]; // this cannot be undefined anyways since an error in the func would've been thrown
    return (
      <div>
        {gunName+ " "+skinName}
      </div>
    )
  }else{
    <div>
      error
    </div>
  }
}