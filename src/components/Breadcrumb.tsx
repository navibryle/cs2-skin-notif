import { Breadcrumbs, Link as MUILink } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext, useContext, useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { type StackEntry } from "~/utils/types";
import { getLastPathOfUrl, getPath, idGen, popStack, pushStack } from "~/utils/util";

export const BreadCrumbContext = createContext({} as {pageStack:Array<StackEntry>,setPageStack:Dispatch<SetStateAction<StackEntry[]>>});

export function Breadcrumb(){
    const [pageStack,setPageStack] = useState<Array<StackEntry>>([{title:"Home",href:"/"}])
    const router = useRouter();
    const breadcrumbCtx = useContext(BreadCrumbContext);
    useEffect(() =>{
      router.beforePopState(({url}) =>{
          const path = getPath(url);
          const cbPageStack = breadcrumbCtx.pageStack;
          const top = cbPageStack[cbPageStack.length-1];
          const top2 =  cbPageStack.length >= 2 ? cbPageStack[cbPageStack.length-2] : null;

          if (top2 != null){
            if (path === top?.href){
              // we are just doing refresh
            }else if (path === top2.href){
              // we are going back
              popStack(cbPageStack,breadcrumbCtx.setPageStack);
            }else{
              // we are navigating to a new page
              pushStack(cbPageStack,breadcrumbCtx.setPageStack,{title:getLastPathOfUrl(path),href:path});
            }
          }else{
            if (path === top?.href){
              // we are just doing refresh
            }else{
              pushStack(cbPageStack,breadcrumbCtx.setPageStack,{title:getLastPathOfUrl(path),href:path});
            }
          }
          return true;
      });
    },[router,breadcrumbCtx.setPageStack,breadcrumbCtx.pageStack]);
    return (
      <BreadCrumbContext.Provider value={ {pageStack,setPageStack} }>
        <BreadcrumbNav/>
      </BreadCrumbContext.Provider>
    );
}
function BreadcrumbNav(){
  const breadcrumbCtx = useContext(BreadCrumbContext);
  return (<Breadcrumbs>
    {breadcrumbCtx.pageStack.map((value: StackEntry) => 
      <Link key={idGen()} href = {value.href}>
          <MUILink  underline="hover" color="inherit">
            {value.title}
          </MUILink>
      </Link>
    )}
  </Breadcrumbs>)
}
