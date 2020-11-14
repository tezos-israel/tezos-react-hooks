import { __awaiter } from "tslib";
import { useState } from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType } from '@airgap/beacon-sdk';
import { useTezosContext } from './TezosContext';
import { useBalance } from './use-balance';
export function useBeaconWallet() {
    const { tezos } = useTezosContext();
    const [initialized, setInit] = useState(false);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const balanceState = useBalance(address);
    const [wallet, setWallet] = useState(null);
    return {
        wallet,
        initialized,
        address,
        connect,
        error: error,
        loading: loading,
        balance: balanceState.balance,
        clearErrors,
    };
    function connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                setLoading(true);
                const address = yield initWallet(options);
                setInit(true);
                setAddress(address);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        });
    }
    function clearErrors() {
        setError('');
        balanceState.clearError();
    }
    function initWallet(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new BeaconWallet(options);
            const network = { type: NetworkType.CARTHAGENET };
            yield wallet.requestPermissions({ network });
            tezos.setWalletProvider(wallet);
            setWallet(wallet);
            return yield wallet.getPKH();
        });
    }
}
//# sourceMappingURL=use-beacon-wallet.js.map