#!/bin/sh
filename="./results/$LANG-$(date +%Y-%m-%d)"

touch $filename
echo $filename

perf stat -o $filename $LANG $1
