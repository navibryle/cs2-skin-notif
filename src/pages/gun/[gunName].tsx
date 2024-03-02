import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { getLastPathOfUrl } from '~/utils/util';
 
export default function Page() {
  const router = useRouter()
  const path = usePathname();
  const [a,setA]  = useState("a");
  if (path !== null && a !== "hello"){
      setA("hello");
      console.log("hello");
  }else if (a !== "ollo"){
      setA("ollo");
      console.log("ollo");
  }
  return <div>hello:{a}</div>;
}
