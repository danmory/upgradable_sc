import { Connection } from "@solana/web3.js";
import * as borsh from "borsh";
import {
  checkProgram,
  getConnection,
  getOrCreateCounterStateAccount,
  getStateDerivedAddress,
} from "./common";
import { CounterAccount, CounterSchema } from "./stateData";

async function getInfo(conn: Connection) {
  const accountInfo = await conn.getAccountInfo(await getStateDerivedAddress());
  if (accountInfo === null) {
    throw "Error: cannot find the account";
  }
  const counter = borsh.deserialize(
    CounterSchema,
    CounterAccount,
    accountInfo.data
  );
  console.log("Counter is ", counter.counter);
}

async function main() {
  const conn = await getConnection();
  await checkProgram(conn);
  await getOrCreateCounterStateAccount(conn);
  await getInfo(conn);
}

main();
