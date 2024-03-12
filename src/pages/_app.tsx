import { AppBar, Button, Toolbar } from "@mui/material";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { api } from "~/utils/api";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
  <SessionProvider session={session}>
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit">Login</Button>
    </Toolbar>
    </AppBar>
    <Component {...pageProps} />
  </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
