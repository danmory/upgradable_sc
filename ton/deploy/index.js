const { mnemonicToWalletKey } = require("ton-crypto");
const { TonClient, WalletContract, WalletV3R2Source } = require("ton");

async function main() {
  const mnemonic = "your mnemonic";
  const key = await mnemonicToWalletKey(mnemonic.split());
  const client = new TonClient({
    endpoint: "testnet.toncenter.com/api/v2/jsonRPC",
  });
  const wallet = WalletContract.create(
    client,
    WalletV3R2Source.create({ publicKey: key.publicKey, workchain: 0 })
  );
  console.log(wallet.address.toString())
}

main();
