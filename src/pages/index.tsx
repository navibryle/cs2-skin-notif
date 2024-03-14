'use client';
import Head from "next/head";
import { useState } from "react";
import SearchBar from '~/components/SearchBar';
import SkinGrid from '~/components/SkinGrid';
import { useSession } from "next-auth/react"

export default function Home() {
  const [query,setInput] = useState("");
  const [hasQueryRes,setHasQueryRes] = useState(false);
  const { data: session, status} = useSession();
  console.warn("DEBUGPRINT[3]: index.tsx:11 (after const  data: session  = useSession();)")
  console.log(session);
  console.log(status);
  console.warn("DEBUGPRINT[4]: index.tsx:13 (after console.log(session);)")
  return (
  <>
    <Head>
    <title>Cs market notifier</title>
    <meta name="description" content="Notifies users with their selected counter strike market trend" />
    <link rel="icon" href="/favicon.ico" />
    </Head>
    <SearchBar  setInput={setInput} hasQueryResState={{hasQueryRes,setHasQueryRes}}/>
    <SkinGrid gunName={query} setHasQueryRes={setHasQueryRes} hasQueryResState={{hasQueryRes,setHasQueryRes}}/>
  </>
  );
}

