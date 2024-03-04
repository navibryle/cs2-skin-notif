import json
import sys
import os
import requests

print(requests.get("https://api.bitskins.com/market/skin/730").json()[0]["name"])
