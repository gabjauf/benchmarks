#!/bin/sh
LANGUAGE_NAME=$1

docker run -it --security-opt seccomp=seccomp-perf.json -v $(pwd)/results:/app/results language-bench-nix/$LANGUAGE_NAME "c test.$LANGUAGE_NAME"