#!/bin/sh
    cd ./benchmarks
    for dir in ./*
    do
      dir=${dir##*/}
      filename="/app/results/$dir-go-$(date +%Y-%m-%d)"

      touch $filename
      cd $dir
        for file in $(find -type f -name "*.go");
      do
      
    perf stat -o $filename go build $file
    perf stat -o $filename ./$(basename $file .go)
  
      done;
      cd ..
    done