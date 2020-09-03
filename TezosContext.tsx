import React, { useContext, useEffect, useState } from "react";
import { TezosProviderProps, State } from "./types";
import { Tezos } from "@taquito/taquito";

// connects to mainnet by default
Tezos.setRpcProvider("https://mainnet.smartpy.io");
const defaultState: State = { tezos: Tezos };

export const TezosContext = React.createContext<Partial<State>>(defaultState);

export const useTezosContext = () => useContext(TezosContext);

export const TezosContextProvider = ({
  tezos,
  children
}: TezosProviderProps) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    setState({ tezos });
  }, [tezos]);

  return (
    <TezosContext.Provider value={{ ...state }}>
      {children}
    </TezosContext.Provider>
  );
};
