import json
import sys
import platform
import socket
import os
from pathlib import Path
from collections import namedtuple

Coordinate = namedtuple("Coordinate", "x y z")


def calc(text):
    jobj = json.loads(text)
    len = 0
    x = 0
    y = 0
    z = 0

    for coord in jobj["coordinates"]:
        x += coord["x"]
        y += coord["y"]
        z += coord["z"]
        len += 1

    return Coordinate(x / len, y / len, z / len)


def notify(msg):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        if not s.connect_ex(("localhost", 9001)):
            s.sendall(bytes(msg, "utf8"))


if __name__ == "__main__":
    right = Coordinate(2.0, 0.5, 0.25)
    for v in [
        """{"coordinates":[{"x":2.0,"y":0.5,"z":0.25}]}""",
        """{"coordinates":[{"y":0.5,"x":2.0,"z":0.25}]}""",
    ]:
        left = calc(v)
        if left != right:
            print("%s != %s" % (left, right), file=sys.stderr)
            quit(1)

    text = Path("/tmp/1.json").read_text()

    notify("%s\t%d" % (platform.python_implementation(), os.getpid()))
    results = calc(text)
    notify("stop")

    print(results)
