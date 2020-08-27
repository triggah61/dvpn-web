/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ONBOARD } from '../../actionTypes/OnbordingTypes';
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../Services/constants';
import { authLogin } from '../../../api/TequilaApiCalls';

export const shouldOnBoard = (): Function => {
    return async (dispatch: Function) => {
        const response = await authLogin({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD });
        dispatch({
            payload: response.success, // if login fails with default credentials, user is considered boarded
            type: ONBOARD,
        });
    };
};
