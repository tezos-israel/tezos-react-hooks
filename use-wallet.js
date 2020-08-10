import { useState } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";

import { useTezosContext } from "./TezosContext";
import { useBalanceState } from "./use-balance-state";

export function useWallet() {
  const { tezos } = useTezosContext();
  const [initialized, setInit] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const balanceState = useBalanceState(address);

  return {
    initialized,
    address,
    error: error || balanceState.error,
    loading: loading || balanceState.loading,
    connect,
    balance: balanceState.balance,
    clearErrors,
  };

  async function connect() {
    try {
      setLoading(true);
      const { address } = await initWallet();
      setInit(true);
      setAddress(address);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function clearErrors() {
    setError("");
    balanceState.clearError();
  }

  async function initWallet() {
    const options = {
      name: "Tezos counter app",
    };
    const wallet = new BeaconWallet(options);
    const network = { type: "carthagenet" };
    await wallet.requestPermissions({ network });
    tezos.setWalletProvider(wallet);

    const address = wallet.permissions.address;
    return { address };
  }
}
