import { useState } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType, Network, DAppClientOptions } from "@airgap/beacon-sdk";
import { TezosToolkit } from "@taquito/taquito";

import { useTezosContext } from "./TezosContext";
import { useBalanceState } from "./use-balance-state";

export function useBeaconWallet() {
  const { tezos }: { tezos: TezosToolkit } = useTezosContext();
  const [initialized, setInit] = useState(false);
  const [address, setAddress] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const balanceState = useBalanceState(address);
  const [wallet, setWallet] = useState<BeaconWallet>();

  return {
    wallet,
    initialized,
    address,
    connect,
    error: error || balanceState.error,
    loading: loading || balanceState.loading,
    initWallet,
    balance: balanceState.balance,
    clearErrors
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
    setError("");
    balanceState.clearError();
  }

  async function initWallet(options: DAppClientOptions): Promise<string> {
    const wallet = new BeaconWallet(options);
    const network: Network = { type: NetworkType.CARTHAGENET };
    await wallet.requestPermissions({ network });
    tezos.setWalletProvider(wallet);
    setWallet(wallet);

    return await wallet.getPKH();
  }
}
