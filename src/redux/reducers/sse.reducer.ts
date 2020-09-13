/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SSEEventType } from 'mysterium-vpn-js';

import { SSEAction, SSEState } from '../actions/sse';

function sseReducer(state: SSEState = {}, action: SSEAction): SSEState {
    switch (action.type) {
        case SSEEventType.AppStateChange:
            return {
                ...state,
                appState: action.payload,
            };
        default:
            return state;
    }
}

export default sseReducer;