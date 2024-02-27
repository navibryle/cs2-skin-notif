import json
import sys
import os
import requests

if (len(sys.argv) != 3):
    print("Incorrect amount of args, need the directory of the json data followed by the target folder.")
    exit()


gunId=0
skinId=0
gunsCreated = []
gunIdMap = {}
rootFolder = sys.argv[2]
sqlFile = rootFolder+"/dataInit.sql"

def parseJsonEntry(fName):
    with open(fName) as file:
        global gunId,skinId
        contentKey = "content"
        fileJson = json.load(file)
        if contentKey in fileJson.keys():
            for _,i in fileJson[contentKey].items():
                for k in i:
                    name = ""
                    skinName = ""
                    gunJson = k["name"]
                    curPos = 0
                    while (gunJson[curPos] != '|'):
                        name += gunJson[curPos]
                        curPos += 1
                    curPos += 1
                    while (curPos < len(gunJson) and gunJson[curPos] != "-"):
                        skinName += gunJson[curPos]
                        curPos+=1
                    newPath = []
                    name = name.strip()
                    if name not in gunsCreated: # check if we need to add gun to the table
                        gunsCreated.append("name")
                        with open(sqlFile,"a") as f:
                            tmp = "INSERT INTO GUNS (ID,NAME) VALUES (" +str(gunId)+",'"+name+"');\n"
                            f.write(tmp)
                        gunIdMap[name] = gunId
                        gunId += 1
                    with open(sqlFile,"a") as f:
                        tmp = "INSERT INTO SKINS (ID,NAME,GUN_ID) VALUES (" + str(skinId) +",'"+skinName+"',"+str(gunIdMap[name])+";\n"
                        f.write(tmp)
                        skinId += 1
                    skinName = skinName.strip().replace(" ","_")
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
                            im.write(requests.get(z).content)
        else:
            print(f"DEBUGPRINT[1]: parser.py:45 (after else:)")
            print(fName)
            print(f"DEBUGPRINT[3]: parser.py:47 (after print(fName))")
            print(fileJson)
            print(f"DEBUGPRINT[2]: parser.py:48 (after print(fileJson))")
if (not os.path.exists(sqlFile)):
    with open(sqlFile,"w") as f:
        print("created init data scripts file")
for (path,dirnames,filenames) in os.walk(sys.argv[1]):
    for i in filenames:
        if i[-4:] == "json":
            parseJsonEntry(path+"/"+i)

