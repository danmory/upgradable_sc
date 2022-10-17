mkdir -p build

func -SPA stdlib.fc helloworld.fc -o helloworld.fif

mv helloworld.fif build/helloworld.fif
