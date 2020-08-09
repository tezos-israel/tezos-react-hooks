import { useState, useEffect } from "react";
import { Tezos } from "@taquito/taquito";

export function useContract(contractAddress) {
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [storage, setStorage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [operationsCount, setOperationsCounter] = useState(0);

  useEffect(() => {
    loadStorage(contract);
  }, [contract, operationsCount]);

  return {
    contract,
    error,
    storage,
    loading,
    operationsCount,
    connect,
    increaseOperationsCount,
    clearError,
  };

  function clearError() {
    setError("");
  }

  function increaseOperationsCount() {
    setOperationsCounter(operationsCount + 1);
  }

  async function connect() {
    setLoading(true);
    try {
      const contractInstance = await Tezos.wallet.at(contractAddress);
      setContract(contractInstance);
      increaseOperationsCount();
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
      setStorage(Number(storage));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
}
