import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import Navbar from "~/components/Toolbar";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
  <SessionProvider session={session}>
    <div className="overflow-x-hidden">
      <Navbar/>
      <Component {...pageProps} />
    </div>
  </SessionProvider>
  );
};

export default api.withTRPC(MyApp);