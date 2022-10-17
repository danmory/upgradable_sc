# Solana upgradability

## Dependencies

1. Solana CLI
2. Rust
3. NodeJS

## Prework

Configure Solana for Local Development and install dependencies

```bash
    solana-keygen new
    
    solana config set --url localhost
    
    solana config set -k ~/.config/solana/id.json 

    npm i

    cargo install
```

## How it works

1. Run Local Solana Blockchain

    `` $ solana-test-validator ``

2. Listen to logs

    `` $ solana logs ``

3. Build and deploy Solana program

    `` $ cargo build-bpf ``

    `` $ solana program deploy ./target/deploy/solana.so ``

4. Run client to send transaction

    `` $ node client/index.js ``

5. Change something in solana program and repeat steps 3-4. The program is upgreaded.
