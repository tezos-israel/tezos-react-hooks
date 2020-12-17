import { ContractAbstraction, Wallet, TezosToolkit } from '@taquito/taquito';
import React from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { DAppClientOptions } from '@airgap/beacon-sdk';

export interface TezosProviderProps {
  tezos?: TezosToolkit;
  children: React.ReactNode;
}

export interface State {
  tezos?: TezosToolkit;
}

export interface ContractHook {
  contract: ContractAbstraction<Wallet> | null;
  error: string;
  storage: any;
  loading: boolean;
  connect: () => void;
  clearError: () => void;
}

export interface BeaconWalletHook {
  wallet: BeaconWallet | null;
  initialized: boolean;
  address: string;
  connect: (options: DAppClientOptions) => void;
  error: string;
  loading: boolean;
  balance: number;
  clearErrors: () => void;
}

export interface BalanceHook {
  balance: number;
  error: string;
  loading: boolean;
  clearError: () => void;
  balanceInTez: () => number;
}
