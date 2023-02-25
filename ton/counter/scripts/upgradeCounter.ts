import { NetworkProvider, compile } from '@ton-community/blueprint';
import { Counter } from '../wrappers/Counter';
import { Address, toNano } from 'ton-core';

export async function run(provider: NetworkProvider) {
  throw new Error('fill address');
  const counter = Counter.createFromAddress(Address.parse(''));
  const contract = provider.open(counter);
  await contract.sendUpgrade(provider.sender(), {
    newCode: await compile('Counter'),
    value: toNano('0.05'),
  });
}
