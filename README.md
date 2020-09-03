## Tezos-hooks

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Provides react hooks for Tezos Taquito (and Beacon)

## How to install

For now, this library requires your dapp to use typescript. In the near future we will make it available for all users.
We're also, for now, requiring you use `@taquito/taquito` and `@taquito/beacon-wallet`

Run:

```bash
# for yarn users
yarn add @tezos-il/tezos-react-hooks @taquito/taquito @taquito/beacon-wallet

# for npm users
npm i @tezos-il/tezos-react-hooks @taquito/taquito @taquito/beacon-wallet
```

## How to use

just import the required hook into your app:

```js
import {TezosContextProvider, useTezosContext, useBeaconWallet, useContract, useBalance} from `@tezos-il/tezos-react-hooks`
```

### TezosContext

We're providing a context provider/hook pair that is required for all of our hooks. The way to use it this:

Usually you'll want to configure the Tezos object you get from taquito. Otherwise we supply a default that connects to mainnet on https://mainnet.smartpy.io

Wrap the components where you use the tezos hooks with `TezosContextProvider` - usually you do this in your root component.

```js
import {TezosToolkit} from '@taquito/taquito'
import {TezosContextProvider} from '@tezos-il/tezos-react-hooks'

const tezos = new TezosToolkit()

// configure tezos here

<TezosContextProvider tezos={tezos}>
    <App />
</TezosContextProvider>
```

and inside your app you can use the hooks `useBeaconWallet`, `useBalance`, `useContract` which use this tezos object, or you can get this object by using `useTezosContext`:

```js
import {useTezosContext} from '@tezos-il/tezos-react-hooks'

function Component() {
    const {tezos} = useTezosContext()
    ...
}
```

### useBeaconWallet

This example will connect to the wallet automatically and will show the address once connected:

```js
import {useEffect}, React from 'react'
import {useBeaconWallet} from '@tezos-il/tezos-react-hooks'

function App() {
    const {
        wallet, // the wallet object returned from taquito
        initialized, // true iff the wallet is initialized
        address, // null when wallet is not initialized, otherwise it's the wallet's address
        connect, //call this function with DAppClientOptions to connect to a beacon wallet
        loading, // true when wallet is loading
        balance, // holds the account's balance (for now it's not reactive)
        error, // string, not empty when there's an error
        clearErrors // can be called to clear the error
    } = useBeaconWallet()

    useEffect(() => {
        connect()
    }, [])

    return <div>{balance}</div>
}
```

Expose other utility values as `error`, `loading`, `initialized`

### useContract

```js
import {useEffect}, React from 'react'
import {useContract} from '@tezos-il/tezos-react-hooks'

function App() {
  const {
    contract, // WalletContract object
    error,
    storage, // contract storage
    loading,
    connect, // a function to connect to the contract
    clearError
  } = useContract(CONTRACT_ADDRESS)
  ...
}
```

By calling `connect` with a valid contract address the contract object will be a `WalletContract`. Using this object you can call an entrypoint by calling `contract.methods.entrypoint().send()`. This is just a simple example, you can see more in Taquito docs.

### useBalance

```js
import {useEffect}, React from 'react'
import {useBalance} from '@tezos-il/tezos-react-hooks'

function App() {
  const {
    balance, // the balance of ACCOUNT_ADDRESS (mutes)
    error,
    loading,
    clearError,
    balanceInTez // a function to get `balance` in tez
  } = useBalance(ACCOUNT_ADDRESS)
...
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/claudebarde"><img src="https://avatars3.githubusercontent.com/u/25201109?v=4" width="100px;" alt=""/><br /><sub><b>Claude Barde</b></sub></a><br /><a href="https://github.com/tezos-israel/tezos-react-hooks/commits?author=claudebarde" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/chiptus"><img src="https://avatars3.githubusercontent.com/u/1381655?v=4" width="100px;" alt=""/><br /><sub><b>Chaim Lev-Ari</b></sub></a><br /><a href="https://github.com/tezos-israel/tezos-react-hooks/commits?author=chiptus" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
