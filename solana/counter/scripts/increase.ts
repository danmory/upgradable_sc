import {
  Connection,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  getConnection,
  getProgramID,
  getStateDerivedAddress,
  getWalletKeypair,
} from "./common";
import { Instructions } from "./instructions";

async function increase(conn: Connection) {
  const transaction = new Transaction().add(
    new TransactionInstruction({
      keys: [
        {
          pubkey: await getStateDerivedAddress(),
          isSigner: false,
          isWritable: true,
        },
      ],
      programId: getProgramID(),
      data: Buffer.from([Instructions.Increase]),
    })
  );
  await sendAndConfirmTransaction(conn, transaction, [getWalletKeypair()]);

  console.log("Increase transaction sent...");
}

async function main() {
  const conn = await getConnection();
  await increase(conn);
}

main();
