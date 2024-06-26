import { type Dispatch, type SetStateAction } from "react";
import { type StackEntry } from "./types";

export const getLastPathOfUrl = (url : string):string => {
  let idxOfFirstSlash = -1;
  for (let i = url.length - 1; i > -1 && url[i] !== "/";i--){
    idxOfFirstSlash = i;
  }
  if ( idxOfFirstSlash === -1){
    // this means that the url does not contain "/" characters, so we are either at root or the url is invalid
    return "/ROOT";
  }
  let out = "";
  while(url[idxOfFirstSlash] !== "?" && idxOfFirstSlash < url.length){
    if (url.at(idxOfFirstSlash) !== undefined){
      out +=  url?.at(idxOfFirstSlash);
    }
    idxOfFirstSlash++;
  }
  return out;
}

export const getPath = (url : string) : string => {
  let idxOfFirstSlash = -1;

  for (;idxOfFirstSlash < url.length && url[idxOfFirstSlash] !== "/";idxOfFirstSlash++){
  }

  if (idxOfFirstSlash == url.length){
    // we are at root
    return "/";
  }

  return url.substring(idxOfFirstSlash);
}

export const convertToDbForm = (frontEndString:string) => {
  return frontEndString.replaceAll(" ","_");
}

export const convertToFrontEndForm = (dbString:string) => {
  return dbString.replaceAll("_"," ");
}

export const idGen = () => {
  return (Math.random()*Math.pow(2,31));
}

// the gunName and skinName must be in db form
export const getPathToPic = (gunName:string,skinName:string) => {
  return "/Skins".concat("/").concat(gunName).concat("/Factory_New").concat("/").concat(skinName).concat(".png");
}

export const popStack = (pageStack: Array<StackEntry>,setPageStack:Dispatch<SetStateAction<Array<StackEntry>>>) => {
  pageStack.pop();
  setPageStack(pageStack);
}

export const pushStack = (pageStack :Array<StackEntry>,setPageStack :Dispatch<SetStateAction<Array<StackEntry>>>,entry :StackEntry) => {
  pageStack.push(entry);
  setPageStack(pageStack);
}

export const getNamesFromUrl = (path :string) => {
  if (!path){
    throw Error("Url is an empty string.")
  }
  let [gunName,skinName] = getLastPathOfUrl(path).split("_");
  if (!gunName || !skinName){
    throw Error("Url has no gun");
  }
  gunName = convertToDbForm(decodeURI(gunName));
  skinName = convertToDbForm(decodeURI(skinName));
  if (skinName.includes(".json")){
    skinName = skinName.replace(".json","");
  }
  return [gunName,skinName]
}