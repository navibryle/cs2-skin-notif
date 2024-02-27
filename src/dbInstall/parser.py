import json
import sys
import re
import os
import requests

rootFolder = "/home/ivan/test/testCS"
# for (path,dirnames,filenames) in walk(sys.argv[1]):
#     print(path)
#     if len(filenames) > 0:
#         print(filenames[0])
def parseJsonEntry(fName):
    with open(fName) as file:
        fileJson = json.load(file)
        for _,i in fileJson["content"].items():
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
                skinName = skinName.strip().replace(" ","_")
                rootPath = rootFolder+"/"+name
                for wearTier,z in k["wears"].items():
                    newPath.append(rootPath+"/"+wearTier)
                for idx,h in enumerate(newPath):
                    h = h.replace(" ","_")
                    newPath[idx] = h
                    if not os.path.exists("h"):
                        os.makedirs(h)
                for (idx,(wearTier,z)) in enumerate(k["wears"].items()):
                    with open(newPath[idx]+"/"+skinName+".png","wb") as im:
                        im.write(requests.get(z).content)
parseJsonEntry(sys.argv[1])

