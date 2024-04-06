import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import { CenteredLoading } from "./Loading";

const SignOutBtn = (props : {isSignedIn: boolean}) => {
    if (!props.isSignedIn){
        return null;
    }
    return (
        <Toolbar className = "ml-auto">
            <Button onClick={() => signOut()} className="text-xs">Sign Out</Button>
        </Toolbar>
    )
}

export default function Navbar (){
    const { data: session, status} = useSession();
    const {push} = useRouter();
    let content = null;
    if (status == "loading"){
        content = <CenteredLoading/>;
    }else if (status == "unauthenticated"){
        content = <Button onClick={() => signIn()} >Login</Button>;
    }else{
        content = <Button onClick={() => push("/login/".concat(session?.user?.name ?? "unkown/user"))} className="text-xs" style={{backgroundColor:"rgb(52,120,232)"}}>{session?.user.email}</Button>;
    }
    return (
        <AppBar position="static">
            <div className = "flex"> 
                <Toolbar>
                    <IconButton onClick={() => push("/")}>
                      <HomeIcon/>
                    </IconButton>
                    {content}
                </Toolbar>
                <SignOutBtn isSignedIn={status == "authenticated"}/>
            </div>
        </AppBar>
    )
}