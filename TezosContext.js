import React, { createContext, useContext } from "react";

export const TezosContext = createContext({
  tezos: null,
});

export const useTezosContext = () => useContext(TezosContext);

export const TezosProvider = TezosContext.Provider;
