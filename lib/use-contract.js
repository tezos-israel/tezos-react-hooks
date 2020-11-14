import { __awaiter } from "tslib";
import { useState, useEffect } from 'react';
import { useTezosContext } from './TezosContext';
import { validateAddress } from '@taquito/utils';
export function useContract(contractAddress, refreshInterval) {
    const { tezos } = useTezosContext();
    const [contract, setContract] = useState(null);
    const [error, setError] = useState('');
    const [storage, setStorage] = useState();
    const [loading, setLoading] = useState(false);
    const [refreshStorageInterval, setRefreshStorageInterval] = useState();
    useEffect(() => {
        loadStorage(contract);
        clearInterval(refreshStorageInterval);
        const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () { return loadStorage(contract); }), refreshInterval || 60000);
        setRefreshStorageInterval(interval);
        return () => {
            clearInterval(refreshStorageInterval);
        };
    }, [contract]);
    useEffect(() => {
        if (validateAddress(contractAddress) === 3) {
            connect();
        }
    }, [contractAddress]);
    return {
        contract,
        error,
        storage,
        loading,
        connect,
        clearError,
    };
    function clearError() {
        setError('');
    }
    function connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!tezos) {
                setError('No Tezos provider');
                return;
            }
            clearError();
            setLoading(true);
            try {
                const contractInstance = yield tezos.wallet.at(contractAddress);
                setContract(contractInstance);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        });
    }
    function loadStorage(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contract) {
                return;
            }
            try {
                setLoading(true);
                const storage = yield contract.storage();
                setStorage(storage);
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
//# sourceMappingURL=use-contract.js.map