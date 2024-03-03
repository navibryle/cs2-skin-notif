import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { getLastPathOfUrl } from '~/utils/util';
 
export default function Page() {
  const router = useRouter()
  const path = usePathname();
  if (path !== null){
      const gunName = getLastPathOfUrl(path);
      return <div>{gunName}</div>;
  }else{
      return <div>error</div>;
  }
}
