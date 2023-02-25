import { NetworkProvider } from '@ton-community/blueprint';
import { Counter } from '../wrappers/Counter';
import { Address, toNano } from 'ton-core';

export async function run(provider: NetworkProvider) {
  throw new Error('fill address');
  const counter = Counter.createFromAddress(Address.parse(''));
  const contract = provider.open(counter);
  await contract.sendIncrease(provider.sender(), {
    increaseBy: 15,
    value: toNano('0.05'),
  });
}
