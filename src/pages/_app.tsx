import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { Breadcrumbs, Link } from "@mui/material";
import { type Dispatch, type SetStateAction, useState } from "react";
import "~/styles/globals.css";
import { idGen } from "~/utils/util";

type StackEntry = {
    title:string;
    href:string;
}
function popStack(pageStack: Array<StackEntry>,setPageStack:Dispatch<SetStateAction<Array<StackEntry>>>){
  pageStack.pop();
  setPageStack(pageStack);
}

function pushStack(pageStack :Array<StackEntry>,setPageStack :Dispatch<SetStateAction<Array<StackEntry>>>,entry :StackEntry){
  pageStack.push(entry);
  setPageStack(pageStack);
}

function renderBreadCrumbLinks(pageStack :Array<StackEntry>){
  return (<Breadcrumbs>
    {pageStack.map((value: StackEntry) => 
      <Link key={idGen()} underline="hover" color="inherit" href={value.href}>
        {value.title}
      </Link>
    )}
  </Breadcrumbs>)
}
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [pageStack,setPageStack] = useState<Array<StackEntry>>([{title:"Home",href:"/"}])
  return (
    <SessionProvider session={session}>
      {renderBreadCrumbLinks(pageStack)}
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
