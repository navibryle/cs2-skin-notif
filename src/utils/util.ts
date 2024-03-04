
export function getLastPathOfUrl(url : string):string{
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

export function convertToDbForm(frontEndString:string){
    return frontEndString.replace(" ","_");
}

export function convertToFrontEndForm(dbString:string){
    return dbString.replace("_"," ");
}

export function idGen(){
    return (Math.random()*Math.pow(2,31));
}

// the gunName and skinName must be in db form
export function getPathToPic(gunName:string,skinName:string){
    return "/Skins".concat("/").concat(gunName).concat("/Factory_New").concat("/").concat(skinName).concat(".png");
}
