import json
import sys
import os
import requests
import time

if (len(sys.argv) != 3):
    print("Incorrect amount of args, need the directory of the json data followed by the target folder.")
    exit()


skinId=0
gunsCreated = []
skinCreated = {}
rootFolder = sys.argv[2]
sqlFile = rootFolder+"/dataInit.sql"
count = 0

def findIdxOfLastDash(aString):
    lastIdx = 0
    for idx,i in enumerate(aString):
        if i == "-":
            lastIdx = idx
    return lastIdx

def parseJsonEntry(fName):
    with open(fName) as file:
        global gunId,skinId,gunsCreated,gunIdMap,rootFolder,sqlFile,count
        contentKey = "content"
        fileJson = json.load(file)
        with open(sqlFile,"a",1) as f:
            if contentKey in fileJson.keys():
                for _,i in fileJson[contentKey].items():
                    for k in i:
                        name = ""
                        skinName = ""
                        gunJson = k["name"].split()
                        curPos = 0
                        while (gunJson[curPos] != "|"):
                            name += gunJson[curPos] + " "
                            curPos += 1
                        curPos += 1
                        while (curPos < len(gunJson) and gunJson[curPos] != "-"):
                            skinName += gunJson[curPos] + " "
                            curPos += 1
                        newPath = []
                        name = name.strip().replace(" ","_")
                        skinName = skinName.strip().replace(" ","_")
                        if name not in gunsCreated:
                            gunsCreated.append(name)
                            skinCreated[name] = []
                        if skinName not in skinCreated[name]: # check if we need to add skin to the table
                            skinCreated[name].append(skinName)
                            tmp = "INSERT INTO SKINS (ID,NAME,GUN_NAME) VALUES (" + str(skinId) +",'"+skinName+"','"+name+"');\n"
                            f.write(tmp)
                            skinId += 1
                            rootPath = rootFolder+"/"+name
                            for wearTier,z in k["wears"].items():
                                newPath.append(rootPath+"/"+wearTier)
                            for idx,h in enumerate(newPath):
                                h = h.replace(" ","_")
                                newPath[idx] = h
                                if not os.path.exists(h):
                                    os.makedirs(h)
                            for (idx,(wearTier,z)) in enumerate(k["wears"].items()):
                                with open(newPath[idx]+"/"+skinName+".png","wb") as im:
                                    r = requests.get(z)
                                    print("req status",str(r.status_code),count,name,skinName)
                                    count += 1
                                    im.write(r.content)
                                    time.sleep(1)
                        else:
                          print("Already in the sql file ",name,skinName)
if (not os.path.exists(rootFolder)):
    os.makedirs(rootFolder)
if (not os.path.exists(sqlFile)):
    with open(sqlFile,"w") as f:
        print("created init data scripts file")
for (path,dirnames,filenames) in os.walk(sys.argv[1]):
    for i in filenames:
        if i[-4:] == "json":
            parseJsonEntry(path+"/"+i)