import { AppBar, Button, Toolbar } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

const logIn = async () => {
  console.warn("DEBUGPRINT[1]: _app.tsx:8 (after const logIn = async () => )")
  console.log(await signIn("google"))
  console.warn("DEBUGPRINT[2]: _app.tsx:10 (after console.log(await signIn(google)))")
}

const Navbar = () => {
    const { data: session, status} = useSession();
    let content = null;
    if (status == "loading"){
        content = <div>loading</div>;
    }else if (status == "unauthenticated"){
        content = <Button color="inherit" onClick={() => logIn()} >Login</Button>;
    }else{
        content = <Button color="inherit">{session?.user.email}</Button>;
    }
    return (
    <AppBar position="static">
        <Toolbar>
            {content}
        </Toolbar>
    </AppBar>
    )
}

export default Navbar;
