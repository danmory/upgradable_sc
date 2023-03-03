import { toNano } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import { compile, NetworkProvider } from '@ton-community/blueprint';
import fs from 'fs';

export async function run(provider: NetworkProvider) {
  const counter = Counter.createFromConfig(
    {
      counter: 0,
    },
    await compile('Counter')
  );
  await provider.deploy(counter, toNano('0.05'));
  const openedContract = provider.open(counter);
  const address = openedContract.address.toString();
  console.log('Deployed at ', address);
  saveAddress(address);
}

function saveAddress(address: string) {
  fs.writeFileSync('contract_address', address);
}
