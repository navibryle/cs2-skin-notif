'use client';
import { type AutocompleteInputChangeReason } from "@mui/material";
import Head from "next/head";
import { useState, type SyntheticEvent } from "react";
import SearchBar from '~/components/SearchBar';
import SkinGrid from '~/components/SkinGrid';

export default function Home() {
  const [query,setInput] = useState("");
  const onSearchInput = (event: SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => {
    setInput(value);
  }
  return (
    <>
      <Head>
        <title>Cs market notifier</title>
        <meta name="description" content="Notifies users with their selected counter strike market trend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar  onSearchInput={onSearchInput}/>
      <SkinGrid gunName={query}/>
    </>
  );
}

