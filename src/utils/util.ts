
export function getLastPathOfUrl(url : string):string{
    console.warn("DEBUGPRINT[5]: util.ts:2 (after export function getLastPathOfUrl(url : s…)")
    console.log(url);
    console.warn("DEBUGPRINT[6]: util.ts:4 (after console.log(url);)")
    let idxOfFirstSlash = -1;
    for (let i = url.length - 1; i > -1 && url[i] !== "/";i--){
        idxOfFirstSlash = i;
    }
    if ( idxOfFirstSlash === -1){
        // this means that the url does not contain "/" characters, so we are either at root or the url is invalid
        return "/ROOT";
    }
    idxOfFirstSlash++; // move to the right of "/"
    let out = "";
    while(url[idxOfFirstSlash] !== "?" && idxOfFirstSlash < url.length){
        if (url.at(idxOfFirstSlash) !== undefined){
            out +=  url?.at(idxOfFirstSlash);
        }
    }
    return out;
}
