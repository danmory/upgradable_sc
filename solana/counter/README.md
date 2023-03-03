# Solana Upgrade

## Prerequisites

1. Solana SDK
2. NodeJS
3. Rust
4. Installed libraries from package.json(npm) and Cargo.toml(cargo)

## Steps

1. Create Wallet(Pubkey + Privatekey) using *solana-keygen* CLI command
2. Build program in *src/lib.rs*

    `` $ cargo build-sbf ``

3. Deploy program

    ``$ solana program deploy target/deploy/counter.so --program-id target/deploy/counter-keypair.json``

4. Interact with program using TS scripts

    ```bash
    
      npx ts-node scripts/get.ts
      npx ts-node scripts/increase.ts
    ```

5. Upgrade program(add decrease functionality).
Check *src/lib.new.rs* and replace code of *src/lib.rs* with new one.
6. Build new program(see p.2)
7. Deploy program(see p.3)
8. Now second version of the program has new functionality

    ```bash
      
        npx ts-node scripts/get.ts
        npx ts-node scripts/increase.ts
        npx ts-node scripts/decrease.ts

    ```
