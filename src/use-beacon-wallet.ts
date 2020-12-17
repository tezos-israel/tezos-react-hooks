import { useState } from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, Network, DAppClientOptions } from '@airgap/beacon-sdk';
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
  const [wallet, setWallet] = useState<BeaconWallet | null>(null);

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

  async function connect(options: DAppClientOptions) {
    try {
      setLoading(true);
      const address: string = await initWallet(options);
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

  async function initWallet(options: DAppClientOptions): Promise<string> {
    if (!tezos) {
      throw new Error('Tezos object is undefined');
    }

    const wallet = new BeaconWallet(options);
    const network: Network = { type: NetworkType.CARTHAGENET };
    await wallet.requestPermissions({ network });
    tezos.setWalletProvider(wallet);
    setWallet(wallet);

    return await wallet.getPKH();
  }
}
