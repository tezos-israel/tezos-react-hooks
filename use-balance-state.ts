import { useState, useEffect } from "react";
import { useTezosContext } from "./TezosContext";

export function useBalanceState(address: string = "") {
  const { tezos } = useTezosContext();
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await loadBalance(address);
    })();
  }, [address]);

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
      const balance = await tezos.tz.getBalance(address);
      setBalance(balance / 10 ** 6);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
}