import assert from 'assert';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { use } from 'react';
import SkinPriceContainer from '~/components/SkinPriceContainer';
import { convertToDbForm, getLastPathOfUrl, getPathToPic } from '~/utils/util';
export default function Page() {
  const path = usePathname();
  if (path !== null){
      let [gunName,skinName] = getLastPathOfUrl(path).split("_");
      if (gunName === undefined || skinName === undefined){
          throw Error("wtf");
      }
      gunName = convertToDbForm(decodeURI(gunName));
      skinName = convertToDbForm(decodeURI(skinName));
      assert(gunName.length > 0,"No gun was selected");
      return (
        <div className="h-lvh">
            <SkinPriceContainer/>
            <div className="flex flex-row h-full">
                <div className="flex flex-1 flex-col justify-center">
                    <div id ="pic" >
                        <Image src={getPathToPic(gunName,skinName)} alt={gunName.concat(" ").concat(skinName)} width={500} height={700}/>
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                    <div>
                        display the current api prices here
                    </div>
                </div>
            </div>
        </div>
      )  
      }else{
          return <div>error</div>;
  }
}
