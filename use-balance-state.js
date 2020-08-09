import { useState, useEffect } from "react";
import { Tezos } from "@taquito/taquito";

export function useBalanceState(address = "", contractOperationsCount = 0) {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBalance(address);
  }, [address, contractOperationsCount]);

  return { balance, error, loading, clearError };

  function clearError() {
    setError("");
  }

  async function loadBalance(address) {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const balance = await Tezos.tz.getBalance(address);
      setBalance(balance / 10 ** 6);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
}
