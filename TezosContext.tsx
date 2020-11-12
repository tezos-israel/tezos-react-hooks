import * as React from 'react';
import { TezosProviderProps, State } from './types';
import { Tezos } from '@taquito/taquito';

// connects to mainnet by default
Tezos.setRpcProvider('https://mainnet.smartpy.io');
const defaultState: State = { tezos: Tezos };

export const TezosContext = React.createContext<State>(defaultState);

export const useTezosContext = () => React.useContext(TezosContext);

export const TezosContextProvider = ({
  tezos,
  children,
}: TezosProviderProps) => {
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    setState({ tezos });
  }, [tezos]);

  const Provider = TezosContext.Provider;

  return <Provider value={{ ...state }}>{children}</Provider>;
};
