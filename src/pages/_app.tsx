import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import MenuIcon from '@mui/icons-material/Menu';
import "~/styles/globals.css";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";


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
