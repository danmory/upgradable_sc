# Upgrade smart contract

1. Install NodeJS 18+ and npm packages

2. Deploy Counter smart contract

    ```bash
      npx blueprint build
      npx blueprint run deployCounter 
    ```
  
3. Run Get and/or Increase method

    ```bash
      $ npx blueprint run getCounter
      0
      $ npx blueprint run increaseCounter
      $ npx blueprint run getCounter
      1
    ```

4. Change contract code in *contracts/counter.fc*. New code template could be found in *new_counter.fc*

5. Run Upgrade

    ```bash
      npx blueprint run upgradeCounter
    ```

6. Now it is possible to decrease counter

  ```bash
      $ npx blueprint run getCounter
      1
      $ npx blueprint run decreaseCounter
      $ npx blueprint run getCounter
      0
    ```
