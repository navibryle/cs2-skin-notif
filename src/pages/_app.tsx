import { AppBar, Button, Toolbar } from "@mui/material";
import { type Session } from "next-auth";
import { SessionProvider, signIn } from "next-auth/react";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const logIn = async () => {
  console.warn("DEBUGPRINT[1]: _app.tsx:8 (after const logIn = async () => )")
  const tmp = await signIn("google");
  console.log(tmp);
  console.warn("DEBUGPRINT[2]: _app.tsx:11 (after console.log(tmp);)")
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
  <SessionProvider session={session}>
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit" onClick={() => logIn()} >Login</Button>
    </Toolbar>
    </AppBar>
    <Component {...pageProps} />
  </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
