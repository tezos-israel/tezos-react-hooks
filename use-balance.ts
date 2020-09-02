import { useState, useEffect } from "react";
import { useTezosContext } from "./TezosContext";
import { BalanceHook } from "./types";
import BigNumber from "bignumber.js";

export function useBalance(address: string = ""): BalanceHook {
  const { tezos } = useTezosContext();
  const [balance, setBalance]: [number, (p: number) => void] = useState();
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

  async function loadBalance(address: string) {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const balance: BigNumber = await tezos.tz.getBalance(address);
      setBalance(balance.toNumber());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
}
