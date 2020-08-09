import { useState } from "react";
import { Tezos } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export function useWallet() {
  const [initialized, setInit] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return { initialized, address, error, loading, connect, clearError };

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

  function clearError() {
    setError("");
  }

  async function initWallet() {
    Tezos.setProvider({ rpc: "https://carthagenet.SmartPy.io" });
    const options = {
      name: "Tezos counter app",
    };
    const wallet = new BeaconWallet(options);
    const network = { type: "carthagenet" };
    await wallet.requestPermissions({ network });
    Tezos.setWalletProvider(wallet);

    const address = wallet.permissions.address;
    return { address };
  }
}
