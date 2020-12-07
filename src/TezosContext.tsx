import * as React from 'react';
import { TezosProviderProps, State } from './types';
import { TezosToolkit } from '@taquito/taquito';

// connects to mainnet by default
const tezos = new TezosToolkit('https://mainnet.smartpy.io');

const defaultState: State = { tezos };

export const TezosContext = React.createContext<State>(defaultState);

export const useTezosContext = (): State => React.useContext(TezosContext);

export function TezosContextProvider({
  tezos,
  children,
}: TezosProviderProps): React.ReactElement {
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    setState({ tezos });
  }, [tezos]);

  const Provider = TezosContext.Provider;

  return <Provider value={{ ...state }}>{children}</Provider>;
}
