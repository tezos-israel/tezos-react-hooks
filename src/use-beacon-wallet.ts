import { useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';

import { BeaconWalletHook } from './types';
import { useTezosContext } from './TezosContext';
import { useBalance } from './use-balance';

export function useBeaconWallet(): BeaconWalletHook {
  const { tezos }: { tezos?: TezosToolkit } = useTezosContext();
  const [initialized, setInit] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const balanceState = useBalance(address);
  const [wallet, setWallet] = useState<any>(null);

  return {
    wallet,
    initialized,
    address,
    connect,
    error: error,
    loading: loading,
    balance: balanceState.balance,
    clearErrors,
  };

  async function connect(
    options: any,
    network: 'mainnet' | 'delphinet' | 'custom' = 'delphinet'
  ) {
    try {
      setLoading(true);
      const address: string = await initWallet(options, network);
      setInit(true);
      setAddress(address);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function clearErrors() {
    setError('');
    balanceState.clearError();
  }

  async function initWallet(
    options: any,
    network: 'mainnet' | 'delphinet' | 'custom'
  ): Promise<string> {
    if (typeof window === 'undefined') {
      throw new Error('Window is undefined');
    }
    if (!tezos) {
      throw new Error('Tezos object is undefined');
    }

    const { BeaconWallet } = await import('@taquito/beacon-wallet');

    const wallet = new BeaconWallet(options);

    await wallet.requestPermissions({
      network: { type: network as any },
    });
    tezos.setWalletProvider(wallet);
    setWallet(wallet);

    return await wallet.getPKH();
  }
}
