import { useState, useEffect } from 'react';
import { useTezosContext } from './TezosContext';
import { ContractHook, State } from './types';
import { WalletContract } from '@taquito/taquito';
import { validateAddress } from '@taquito/utils';

export function useContract(
  contractAddress: string,
  refreshInterval?: number
): ContractHook {
  const { tezos }: State = useTezosContext();
  const [contract, setContract] = useState<WalletContract | null>(null);
  const [error, setError] = useState('');
  const [storage, setStorage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [refreshStorageInterval, setRefreshStorageInterval] = useState<any>();

  useEffect(() => {
    loadStorage(contract);
    clearInterval(refreshStorageInterval);
    // sets interval
    const interval = setInterval(
      async () => loadStorage(contract),
      refreshInterval || 60000
    );
    setRefreshStorageInterval(interval);
    return () => {
      clearInterval(refreshStorageInterval);
    };
  }, [contract]);

  useEffect(() => {
    if (validateAddress(contractAddress) === 3) {
      connect();
    }
  }, [contractAddress]);

  return {
    contract,
    error,
    storage,
    loading,
    connect,
    clearError,
  };

  function clearError() {
    setError('');
  }

  async function connect() {
    if (!tezos) {
      setError('No Tezos provider');
      return;
    }

    clearError();
    setLoading(true);
    try {
      const contractInstance = await tezos.wallet.at(contractAddress);
      setContract(contractInstance);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadStorage(contract: WalletContract | null) {
    if (!contract) {
      return;
    }
    try {
      setLoading(true);
      const storage: Storage = await contract.storage();
      setStorage(storage);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
}
