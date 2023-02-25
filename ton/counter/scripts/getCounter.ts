import { NetworkProvider } from '@ton-community/blueprint';
import { Counter } from '../wrappers/Counter';
import { Address } from 'ton-core';

export async function run(provider: NetworkProvider) {
  throw new Error('fill address');
  const counter = Counter.createFromAddress(Address.parse(''));
  const contract = provider.open(counter);
  console.log(await contract.getCounter());
}
