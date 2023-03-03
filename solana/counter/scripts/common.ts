import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import fs from "fs";
import { COUNTER_SIZE } from "./stateData";

const WALLET_PATH = "...";
const PROGRAM_PATH = "...";
export const SEED = "counter";

export async function getConnection() {
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");
  await connection.getVersion();
  console.log("Connection established...");
  return connection;
}

export function getWalletKeypair() {
  const sk = JSON.parse(fs.readFileSync(WALLET_PATH).toString());
  return Keypair.fromSecretKey(Uint8Array.from(sk));
}

export function getProgramID() {
  const sk = JSON.parse(fs.readFileSync(PROGRAM_PATH).toString());
  return Keypair.fromSecretKey(Uint8Array.from(sk)).publicKey;
}

export async function getStateDerivedAddress() {
  const wallet = getWalletKeypair();
  return PublicKey.createWithSeed(wallet.publicKey, SEED, getProgramID());
}

export async function getOrCreateCounterStateAccount(conn: Connection) {
  const wallet = getWalletKeypair();
  const statePubkey = await getStateDerivedAddress();
  console.log("State account address ", statePubkey.toBase58());
  const stateAccount = await conn.getAccountInfo(statePubkey);
  if (stateAccount === null) {
    console.log("No state account, creating...");
    const lamports = await conn.getMinimumBalanceForRentExemption(COUNTER_SIZE);
    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet.publicKey,
        basePubkey: wallet.publicKey,
        seed: SEED,
        newAccountPubkey: statePubkey,
        lamports,
        space: COUNTER_SIZE,
        programId: getProgramID(),
      })
    );
    await sendAndConfirmTransaction(conn, transaction, [wallet]);
    console.log("State account created...");
  } else {
    console.log("State account found...");
  }
  return statePubkey;
}

export async function checkProgram(conn: Connection) {
  const programId = getProgramID();
  const programInfo = await conn.getAccountInfo(programId);
  if (programInfo == null) {
    throw "Program is not deployed...";
  }
  if (!programInfo.executable) {
    throw "Not executable...";
  }
  console.log("Using program ", programId.toBase58());
}
