import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';

const SignOutBtn = ({isSignedIn} : {isSignedIn: boolean}) => {
    if (!isSignedIn){
        return null;
    }
    return (
        <Toolbar className = "ml-auto">
            <Button color="inherit" onClick={() => signOut()}>Sign Out</Button>
        </Toolbar>
    )
}

const Navbar = () => {
    const { data: session, status} = useSession();
    const {push} = useRouter();
    let content = null;
    if (status == "loading"){
        content = <div>loading</div>;
    }else if (status == "unauthenticated"){
        content = <Button color="inherit" onClick={() => signIn()} >Login</Button>;
    }else{
        content = <Button color="inherit" onClick={() => push("/login/".concat(session?.user?.name ?? "unkown/user"))}>{session?.user.email}</Button>;
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

export default Navbar;