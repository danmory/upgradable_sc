# Tezos Upgradable Counter

The upgrades are performed using lambdas.

## Requirements

1. NodeJS 18+

2. Completium-CLI

## How to

1. Deploy contract

    `` $ completium-cli deploy contracts/counter.arl --parameters '{ "owner" : "<Owner Address>" } ' ``

2. Add first functionality: increment

    `` $ completium-cli call counter --as <account> --entry "set_code" --arg-michelson '(Pair 1 { { PUSH int 1 ; ADD } } )' ``

3. Interact with the contract

    `` $ completium-cli call counter --as <account> --entry "perform" --arg-michelson 1 ``

4. Add upgrade: decrement function

    `` $ completium-cli call counter --as <account> --entry "set_code" --arg-michelson '(Pair 2 { { PUSH int 1 ; SWAP; SUB } } ) ' ``

5. Interact with the contract

    `` $ completium-cli call counter --as <account> --entry "perform" --arg-michelson 2 ``

## View function

To check contract one can use <https://better-call.dev/>
