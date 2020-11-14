import * as React from 'react';
import { Tezos } from '@taquito/taquito';
Tezos.setRpcProvider('https://mainnet.smartpy.io');
const defaultState = { tezos: Tezos };
export const TezosContext = React.createContext(defaultState);
export const useTezosContext = () => React.useContext(TezosContext);
export const TezosContextProvider = ({ tezos, children, }) => {
    const [state, setState] = React.useState(defaultState);
    React.useEffect(() => {
        setState({ tezos });
    }, [tezos]);
    const Provider = TezosContext.Provider;
    return <Provider value={Object.assign({}, state)}>{children}</Provider>;
};
//# sourceMappingURL=TezosContext.jsx.map