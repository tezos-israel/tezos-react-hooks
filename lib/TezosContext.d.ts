import * as React from 'react';
import { TezosProviderProps, State } from './types';
export declare const TezosContext: React.Context<State>;
export declare const useTezosContext: () => State;
export declare function TezosContextProvider({ tezos, children, }: TezosProviderProps): React.ReactElement;
