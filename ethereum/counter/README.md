# Ethereum Counter

## Steps

1. Deploy **CounterV1**.

2. Deploy **Proxy** that points to **CounterV1**.
Init data should be result of *sha3('initialize()')*

3. Interact with **Proxy**: run methods *get* or *increase*.

4. Deploy **CounterV2**.

5. Run *upgrade* method of **CounterV1** and point out to **CounterV2** address.

6. Interact with **Proxy**: run methods *get*, *increase* or *decrease*.

## Note

Under development
