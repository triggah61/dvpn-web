/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AppState, SSEEventType } from 'mysterium-vpn-js';

export interface SessionsStats {
    count: number;
    countConsumers: number;
    sumBytesReceived: number;
    sumBytesSent: number;
    sumDuration: number;
    sumTokens: number;
}

export interface SSEState {
    appState?: AppState;
}

export interface SSEAction {
    type: SSEEventType;
    payload: AppState;
}

export const sseAppStateStateChanged = (state: AppState): SSEAction => {
    return {
        type: SSEEventType.AppStateChange,
        payload: state,
    };
};
