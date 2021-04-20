#!/bin/sh
    cd ./benchmarks
    for dir in ./*
    do
      dir=${dir##*/}
      filename="/app/results/$dir-rust-$(date +%Y-%m-%d)"

      touch $filename
      cd $dir
        for file in $(find -type f -name "*.rs");
      do
      
    perf stat -o $filename rustc $file
    perf stat -o $filename ./$(basename $file .rs)
  
      done;
      cd ..
    done