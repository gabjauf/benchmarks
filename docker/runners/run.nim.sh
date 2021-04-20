#!/bin/sh
    cd ./benchmarks
    for dir in ./*
    do
      dir=${dir##*/}
      filename="/app/results/$dir-nim-$(date +%Y-%m-%d)"

      touch $filename
      cd $dir
        for file in $(find -type f -name "*.nim");
      do
      
    perf stat -o $filename nim c $file
    perf stat -o $filename ./$(basename $file .nim)
  
      done;
      cd ..
    done