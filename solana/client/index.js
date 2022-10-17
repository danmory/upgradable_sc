const web3 = require("@solana/web3.js");

const SOLANA_URI = "http://localhost:8899";
const PROGRAM_ID = "GGXFJUWcroHVdZRrBLVzmAeKxmSCWYUbGKZzo4NjuRh3";
const connection = new web3.Connection(SOLANA_URI);
const payer = web3.Keypair.generate();

async function getAirdrop(payer) {
    console.log("Requesting airdrop...");
    let airdropSignature = await connection.requestAirdrop(
        payer.publicKey,
        web3.LAMPORTS_PER_SOL,
    );
    // wait for the airdrop to be completed
    await connection.confirmTransaction(airdropSignature);
}

async function main() {
    await getAirdrop(payer);
    const transaction = new web3.Transaction();
    console.log("Payer public key: ", payer.publicKey.toBase58());
    transaction.add(
      new web3.TransactionInstruction({
        keys: [
          {
            pubkey: payer.publicKey,
            isSigner: true,
            isWritable: false,
          },
          {
            pubkey: web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: new web3.PublicKey(PROGRAM_ID),
      }),
    );
    console.log("Sending transaction...");
    let txid = await web3.sendAndConfirmTransaction(connection, transaction, [
      payer,
    ]);
    console.log(
        "Transaction submitted:", txid,
    );
}

main();
