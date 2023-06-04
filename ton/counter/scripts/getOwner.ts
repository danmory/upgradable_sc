import { NetworkProvider } from '@ton-community/blueprint';
import { Counter } from '../wrappers/Counter';
import { Address } from 'ton-core';
import { CONTRACT_ADDRESS } from './constants';

export async function run(provider: NetworkProvider) {
  const counter = Counter.createFromAddress(Address.parse(CONTRACT_ADDRESS));
  const contract = provider.open(counter);
  console.log(await contract.getOwner());
}
