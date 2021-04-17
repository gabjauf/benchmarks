#!/bin/sh

set -e

cd ../common/libnotify; make; cd -

echo building crystal
time crystal build test.cr --release -o base64_cr --no-debug
echo building go
time go build -o base64_go test.go
echo building go gcc
time gccgo -O3 -g -o base64_go_gccgo test.go
echo building c++
time g++ -O3 -o base64_cpp test.cpp -lcrypto -I../common/libnotify -L../common/libnotify -lnotify
echo building C
time gcc -O3 -o base64_c test.c -I../common/libnotify -L../common/libnotify -lnotify
echo building scala
time scalac test.scala
echo building java
time javac Base64Java.java
echo building kotlin
time kotlinc Test.kt -include-runtime -jvm-target 13 -d Test-kt.jar
echo building D
time dmd -ofbase64_d -O -release -inline test.d
echo building D gdc
time gdc -o base64_d_gdc -O3 -frelease -finline test.d
echo building ???
time ldc2 -ofbase64_d_ldc -O5 -release test.d
echo building nim gcc
time nim c -o:base64_nim_gcc -d:danger --cc:gcc --verbosity:0 test.nim
echo building nim clang
time nim c -o:base64_nim_clang -d:danger --cc:clang --verbosity:0 test.nim
echo building rust
time cargo build --manifest-path base64.rs/Cargo.toml --release && cp ./base64.rs/target/release/base64 ./base64_rs
echo building C# mono
time mcs -debug- -optimize+ test.cs
echo building C# dotnet
time dotnet build -c Release

if [ ! -d aklomp-base64 ]; then
  git clone --depth 1 https://github.com/aklomp/base64.git aklomp-base64
  cd aklomp-base64
  AVX2_CFLAGS=-mavx2 SSSE3_CFLAGS=-mssse3 SSE41_CFLAGS=-msse4.1 SSE42_CFLAGS=-msse4.2 AVX_CFLAGS=-mavx make lib/libbase64.o
  cd -
fi
gcc -O3 test-aklomp.c -I aklomp-base64/include/ aklomp-base64/lib/libbase64.o -o base64_c_ak -I../common/libnotify -L../common/libnotify -lnotify
wget -qO - https://cpanmin.us | perl - -L perllib MIME::Base64::Perl
echo building V gcc
time v -prod -cc gcc -o base64_v_gcc test.v
echo building V clang
time v -prod -cc clang -o base64_v_clang test.v
