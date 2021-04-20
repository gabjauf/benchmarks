#!/bin/sh
    cd ./benchmarks
    for dir in ./*
    do
      dir=${dir##*/}
      filename="/app/results/$dir-elixir-$(date +%Y-%m-%d)"

      touch $filename
      cd $dir
        for file in $(find -type f -name "*.undefined");
      do
      
    perf stat -o $filename $LANG
  
      done;
      cd ..
    done