# docker build -t language-bench-debian/perf -f Dockerfile.debian.perf .
# docker build -t language-bench-nix/perf -f Dockerfile.nix.perf .

docker build -t language-bench-nix/go -f ./docker/Dockerfile.nix.go.docker .
docker build -t language-bench-nix/nim -f ./docker/Dockerfile.nix.nim.docker .


