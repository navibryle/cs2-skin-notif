import json
import sys
import re
from os import walk

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
                print(name.strip() + " " + skinName.strip())
                print()
                for wearTier,z in k["wears"].items():
                    print(wearTier + " " + z)

parseJsonEntry(sys.argv[1])

