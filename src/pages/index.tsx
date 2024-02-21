import Head from "next/head";
import TextField from "@mui/material/TextField"
import { IconButton } from "@mui/material";
import ZoomInIcon from '@mui/icons-material/ZoomIn';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cs market notifier</title>
        <meta name="description" content="Notifies users with their selected counter strike market trend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen">
        <div className="text-center m-auto">
          <span className="flex">
            <TextField id="outlined-basic" variant="outlined" label="Search"/>
            <IconButton aria-label = "search" className="align-middle">
              <ZoomInIcon/>
            </IconButton>
          </span>
        </div>
      </div>
    </>
  );
}

