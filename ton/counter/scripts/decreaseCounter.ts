import { NetworkProvider } from '@ton-community/blueprint';
import { Counter } from '../wrappers/Counter';
import { Address, toNano } from 'ton-core';
import { CONTRACT_ADDRESS } from './constants';

export async function run(provider: NetworkProvider) {
  const counter = Counter.createFromAddress(Address.parse(CONTRACT_ADDRESS));
  const contract = provider.open(counter);
  await contract.sendDecrease(provider.sender(), {
    value: toNano('0.05'),
  });
}
