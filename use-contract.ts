import { useState, useEffect } from "react";
import { useTezosContext } from "./TezosContext";
import { ContractHook, State } from "./types";
import { WalletContract } from "@taquito/taquito";
import { validateAddress } from "@taquito/utils";

export function useContract(contractAddress: string): ContractHook {
  const { tezos }: State = useTezosContext();
  const [contract, setContract] = useState<WalletContract>();
  const [error, setError] = useState<string>();
  const [storage, setStorage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStorage(contract);
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
    clearError
  };

  function clearError() {
    setError("");
  }

  async function connect() {
    if (!tezos) {
      setError("No Tezos provider");
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

  async function loadStorage(contract) {
    if (!contract) {
      return;
    }
    try {
      setLoading(true);
      const storage = await contract.storage();
      setStorage(storage);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
}