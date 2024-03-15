'use client';
import Head from "next/head";
import { useState } from "react";
import SearchBar from '~/components/SearchBar';
import SkinGrid from '~/components/SkinGrid';

export default function Home() {
  const [query,setInput] = useState("");
  const [hasQueryRes,setHasQueryRes] = useState(false);
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

