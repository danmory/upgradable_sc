import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
} from 'ton-core';

export type CounterConfig = {
  id: number;
  counter: number;
};

export function counterConfigToCell(config: CounterConfig): Cell {
  return beginCell()
    .storeUint(config.id, 32)
    .storeUint(config.counter, 32)
    .endCell();
}

export const Opcodes = {
  increase: 0x7e8764ef,
  upgrade: 0xdbfaf817,
};

export class Counter implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new Counter(address);
  }

  static createFromConfig(config: CounterConfig, code: Cell, workchain = 0) {
    const data = counterConfigToCell(config);
    const init = { code, data };
    return new Counter(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell().endCell(),
    });
  }

  async sendIncrease(
    provider: ContractProvider,
    via: Sender,
    opts: {
      increaseBy: number;
      value: bigint;
    }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell()
        .storeUint(Opcodes.increase, 32)
        .storeUint(opts.increaseBy, 32)
        .endCell(),
    });
  }

  async sendUpgrade(
    provider: ContractProvider,
    via: Sender,
    opts: {
      newCode: Cell;
      value: bigint;
    }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATLY,
      body: beginCell()
        .storeUint(Opcodes.upgrade, 32)
        .storeRef(opts.newCode)
        .endCell(),
    });
  }

  async getCounter(provider: ContractProvider) {
    const result = await provider.get('get_counter', []);
    return result.stack.readNumber();
  }

  async getID(provider: ContractProvider) {
    const result = await provider.get('get_id', []);
    return result.stack.readNumber();
  }
}