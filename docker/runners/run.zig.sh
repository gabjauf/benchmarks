#!/bin/sh
    cd ./benchmarks
    for dir in ./*
    do
      dir=${dir##*/}
      filename="/app/results/$dir-zig-$(date +%Y-%m-%d)"

      touch $filename
      cd $dir
        for file in $(find -type f -name "*.zig");
      do
      
    perf stat -o $filename zig build $file
    perf stat -o $filename ./$(basename $file .zig)
  
      done;
      cd ..
    done