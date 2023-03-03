import * as borsh from "borsh";

export class CounterAccount {
  counter = 0;
  constructor(fields: { counter: number } | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

export const CounterSchema = new Map([
  [CounterAccount, { kind: "struct", fields: [["counter", "u32"]] }],
]);

export const COUNTER_SIZE = borsh.serialize(
  CounterSchema,
  new CounterAccount()
).length;
