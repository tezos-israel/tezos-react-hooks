import { __awaiter } from "tslib";
import { useState, useEffect } from 'react';
import { useTezosContext } from './TezosContext';
export function useBalance(address = '') {
    const { tezos } = useTezosContext();
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield loadBalance(address);
        }))();
    }, [address]);
    return { balance, error, loading, clearError, balanceInTez };
    function clearError() {
        setError('');
    }
    function balanceInTez() {
        return balance / Math.pow(10, 6);
    }
    function loadBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!address) {
                return;
            }
            try {
                setLoading(true);
                const balance = yield tezos.tz.getBalance(address);
                setBalance(balance.toNumber());
            }
            catch (e) {
                setError(e.message);
            }
            finally {
                setLoading(false);
            }
        });
    }
}
//# sourceMappingURL=use-balance.js.map