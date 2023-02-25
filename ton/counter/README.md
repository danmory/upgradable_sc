# Upgrade smart contract

1. Install NodeJS 18+ and install packages

2. Deploy Counter smart contract

  ```bash
    npx blueprint build
    npx blueprint deploy 
  ```
  
3. Run Get and/or Increase method

  ```bash
    $ npx blueprint run getCounter
    0
    $ npx blueprint run runIncrease
    $ npx blueprint run getCounter
    15
  ```

4. Change contract code in *contracts/counter.fc*. New code template could be found in *new_counter.fc*

5. Run Upgrade

  ```bash
    npx blueprint run upgradeCounter
  ```
