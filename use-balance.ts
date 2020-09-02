import { useState, useEffect } from "react";
import { useTezosContext } from "./TezosContext";

export function useBalance(address: string = "") {
  const { tezos } = useTezosContext();
  const [balance, setBalance] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await loadBalance(address);
    })();
  }, [address]);

  return { balance, error, loading, clearError, balanceInTez };

  function clearError() {
    setError("");
  }

  function balanceInTez() {
    return balance / 10 ** 6;
  }

  async function loadBalance(address) {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const balance = await tezos.tz.getBalance(address);
      setBalance(balance.toNumber());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
}
