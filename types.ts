import { TezosToolkit } from "@taquito/taquito";
import React from "react";
import { ContractAbstraction, Wallet } from "@taquito/taquito";

export interface TezosProviderProps {
  tezos: TezosToolkit;
  children: React.ReactNode;
}

export interface State {
  tezos: TezosToolkit | null;
}

export interface ContractHook {
  contract: ContractAbstraction<Wallet>;
  error: string;
  storage: any;
  loading: boolean;
  connect: () => void;
  clearError: () => void;
}
